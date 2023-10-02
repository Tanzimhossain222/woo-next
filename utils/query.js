import gql from 'graphql-tag';

const GET_PRODUCTS = gql`
query {
  products(first: 20) {
    nodes {
      id
      name
   
      ... on SimpleProduct {
      id
      name
      price
      productId
      }
      averageRating
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
      ... on SimpleProductVariation {
        id
        name
        price
      }
    }
  }
}`;

export default GET_PRODUCTS;
