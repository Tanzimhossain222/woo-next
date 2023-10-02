import Layout from "../components/Layout";
import Product from "../components/Products";
import client from "../components/ApolloClient";
import GET_ALL_PRODUCTS from "../utils/query";

// This is the query that Apollo Client will send to WooCommerce.
const PRODUCT_QUERY = GET_ALL_PRODUCTS;

const Index = (props) => {
  const { products } = props;
  return (
    <>
      <Layout>
        {products.length ?
          <div className="product-container" >
            {products.map(product => (
              <Product key={product.id} product={product} />
            ))}
          </div>
          : <p>No products found</p>
        }
      </Layout>
    </>
  )
};


/**
 * This function fetches all products from WooCommerce and passes them to the Index component as props.
 * This function is called by Next.js before the Index component is rendered. 
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 * @returns {object} The props that will be passed to the Index component.  
 */
Index.getInitialProps = async () => {
  const result = await client.query({
    query: PRODUCT_QUERY
  })

  return {
    products: result.data.products.nodes
  }
};

export default Index;