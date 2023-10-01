import Layout from "../components/Layout";
import fetch from "isomorphic-unfetch";

import clientConfig from "../clientConfig";
import Product from "../components/Products";

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
}


/**
 * This function used to fetch data from server and pass it to the component as props. 
 * 
 * @returns  {object} props
*/
Index.getInitialProps = async () => {
    try {
        const res = await fetch(`${clientConfig.siteUrl}/getProducts`);
        if (!res.ok) {
          throw new Error('Network response was not ok'); // Handle error 
        }

        const data = await res.json();

        return { products: data };

      } catch (error) {
        console.error('Fetch error:', error);
        return { products: [] }; // Provide a default value or appropriate handling
      }
}

export default Index;