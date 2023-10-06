import Link from "next/link";

const CategoryBlock = ({ category }) => {
  /**
   * Encode the category slug and id for use in URLs. This is necessary because the category name can contain special characters, and the category id is needed to fetch the category's products. The category id is appended to the slug, so that the slug can be used in the URL, and the id can be extracted from the slug on the category page.
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
   */
  const encodedSlug = encodeURIComponent(category.slug);
  const encodedId = encodeURIComponent(category.id);

  return (
    <div className="col-lg-3 col-md-6 col-sm-12">
      <h1 className="card-header text-center">{category.name} </h1>
      <Link href={`/category?slug=${encodedSlug}-${encodedId}`}>
        <img
          src={
            null !== category.image
              ? category.image.sourceUrl
              : "https://via.placeholder.com/300x300"
          }
          alt={category.image.title}
        />
      </Link>
    </div>
  );
};

export default CategoryBlock;
