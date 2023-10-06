import Link from 'next/link';
import AddToCartButton from './cart/AddToCartButton';
const Product = (props) => {
  const { product } = props;
  return (
    <>
      <div className="card mb-3  col-lg-3 col-md-6 col-sm-12">
        <h3 className="card-header text-center">{product.name} </h3>
        {/* as={`/product?${product.slug}-${product.productId}`} */} 
       <Link  href={`/product?slug=${product.slug}-${product.productId}`}>
       <img src={`${product.image.sourceUrl}`} alt="product Image" />
        </Link>
        <div className="card-body text-center">
          <h6 className="card-subtitle  mb-3">{product.price} </h6>
          <AddToCartButton product={product} />
        </div>
      </div>
    </>
  );
};

export default Product;
