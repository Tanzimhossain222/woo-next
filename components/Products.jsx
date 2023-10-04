import Link from 'next/link';
const Product = (props) => {
  const { product } = props;
  
  return (
    <>
      <div className="card mb-3 ms-3">
        <h3 className="card-header text-center">{product.name} </h3>
        {/* as={`/product?${product.slug}-${product.productId}`} */} 
       <Link  href={`/product?slug=${product.slug}-${product.productId}`}>
       <img src={`${product.image.sourceUrl}`} alt="product Image" />
        </Link>
        <div className="card-body text-center">
          <h6 className="card-subtitle  mb-3">{product.price} </h6>
          
        </div>
      </div>
    </>
  );
};

export default Product;
