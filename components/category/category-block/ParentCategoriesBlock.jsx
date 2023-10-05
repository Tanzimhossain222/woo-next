import CategoryBlock from "./CategoryBlock";

const ParentCategoriesBlock = (props) => {
  const { productCategories } = props;
  return (
    <div className="product-container row d-flex justify-content-center">
      {productCategories.length ? (
        productCategories.map((category, index) => ( <CategoryBlock category={category} key={index} />))
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default ParentCategoriesBlock;
