import Layout from '@/components/Layout'
import { GET_ALL_CATEGORIES } from '@/utils/query'
import React from 'react'
import client from '@/components/ApolloClient';
import ParentCategoriesBlock from '@/components/category/category-block/ParentCategoriesBlock';

const CATEGORY_QUERY =GET_ALL_CATEGORIES; // gql`query GET_ALL_CATEGORIES 

const Categories = (props) => { 
const { productCategories } = props;
  return (
    <Layout>
        <div className="text-center mt-5">
            <h2>Categories</h2>
            <ParentCategoriesBlock productCategories={productCategories} />
        </div>
    </Layout>
  )
}

/**
 * Fetch data from external API on server side 
 * @returns {object} props
 */
Categories.getInitialProps = async () => {
    const result = await client.query({
        query: CATEGORY_QUERY
    });

    return {
        productCategories: result.data.productCategories.nodes
    }
}


export default Categories