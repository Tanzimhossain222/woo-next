import gql from 'graphql-tag';

const GET_ALL_PRODUCTS = gql`
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


export const GET_PRODUCT_BY_SLUG = gql`
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

export const GET_ALL_CATEGORIES = gql`
  query {
    productCategories(first: 3) {
      nodes {
        id
        name
        slug
        image {
          sourceUrl
          title
        }
      }
    }
  }
`;

export const GET_PRODUCTS_BY_CATEGORY = gql`
query GetProductsByCategory($id: ID!) {
  productCategory(id: $id) {
    name
    products {
      edges {
        node {
          id
          name
          slug
          description
          image {
            srcSet
            sourceUrl
            title
            uri
          }
          ... on VariableProduct {
            id
            name
            productId
          }
          ... on ExternalProduct {
            id
            name
            productId
          }
          ... on GroupProduct {
            id
            name
            productId
          }
          ... on SimpleProduct {
            id
            name
             productId
          }
        }
      }
    }
  }
}
`

export default GET_ALL_PRODUCTS;
