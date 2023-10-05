import Layout from '@/components/Layout';
import { GET_PRODUCTS_BY_CATEGORY } from '@/utils/query';
import { withRouter } from 'next/router';
import React from 'react';
import client from '@/components/ApolloClient';

const PRODUCTS_BY_CATEGORY = GET_PRODUCTS_BY_CATEGORY;

const Category = withRouter(props => {
  console.log(props);
  return (
    <Layout>
        <h1>Category</h1>
    </Layout>
  )
})

Category.getInitialProps = async (context) => {
  // Splice the id from the slug
  const { slug } = context.query;
  const id = slug ? slug.split('-').pop() : context.query.id;

  const result = await client.query({
    query: PRODUCTS_BY_CATEGORY,
    variables: { id },
  });

  return {
    categoryName: result.data.productCategory.name,
    // Access the products array through result.data.productCategory.products.edges
    products: result.data.productCategory.products.edges.map((edge) => edge.node),
  };
};


export default Category;