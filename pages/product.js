import Layout from "../components/Layout";
import { withRouter } from 'next/router';
import client from "../components/ApolloClient";
import gql from 'graphql-tag';

const Product = (props) => {
  console.log(props);
  return (
    <div>product</div>
  )
}

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
