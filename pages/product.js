import Layout from "../components/Layout";
import { withRouter } from 'next/router';
import client from "../components/ApolloClient";
import gql from 'graphql-tag';

/**
 * This component renders a single product. It receives the product as props from the getInitialProps function.
 * @param {*} props 
 * @returns 
 */
const Product = (props) => {
  const { product } = props;

  /**
   * it uses the dangerouslySetInnerHTML prop to render the product description. so that the HTML tags are rendered as HTML and not as text.
   * @param {*} htmlString 
   * @returns 
   * @see https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
   * 
   */
  const renderHTML = (htmlString) => {
    return { __html: htmlString };
  };

  return (
    <Layout>
      {
        product ?
        <div className="woo-next-single">
          <div className="woo-next-single__product card bg-light mb-3 p-5" >
            <div className="card-header">{product.name}</div>
            <div className="card-body">
              <h4 className="card-title">{product.name}</h4>
              <img src={product.image.sourceUrl} alt="product Image" srcSet={product.image.srcSet} width="400px" />
              <div dangerouslySetInnerHTML={renderHTML(product.description)} />
            </div>
          </div>
          </div>
          : ''
      }
    </Layout>
  )
}

/**
 * This function fetches a single product from WooCommerce and passes it to the Product component as props.
 * @param {*} context 
 * @returns 
 */
Product.getInitialProps = async function (context) {
  let { query: { slug } } = context;
  const id = slug ? slug.split('-').pop() : context.query.id; 

  const PRODUCT_QUERY = gql`
    query GetProduct($productId: ID!) {
      product(idType: DATABASE_ID, id: $productId) {
        id
        name
        slug
        description
        image {
          uri
          title
          srcSet
          sourceUrl
        }
        ... on VariableProduct {
          id
          name
          price
          productId
        }
        ... on ExternalProduct {
          id
          name
          price
          productId
        }
        ... on GroupProduct {
          id
          name
          price
          productId
        }
      
      }
    }
  `;

  const res = await client.query({
    query: PRODUCT_QUERY,
    variables: { productId: id }
  });

  return { product: res.data.product }
}

export default withRouter(Product);
