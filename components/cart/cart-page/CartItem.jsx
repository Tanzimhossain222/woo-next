import { useState } from "react";
import { updateCart } from "@/functions";
import { ToFixedNum } from "@/utils/functions";
const CartItem = ({ item, setCart, handleRemoveItem }) => {
  const [productCount, setProductCount] = useState(item.qty);
  // Handle Quantity Input Change
  const handleProductChange = (e) => {
    if (process.browser) {
      let newQty = e.target.value;
      setProductCount(newQty);

      // Update this item's quantity in localStorage
      let existingCart = localStorage.getItem("woo-next-cart");
      existingCart = JSON.parse(existingCart);
      
      const updatedCart = updateCart(existingCart, item, false, newQty); // Update cart

      // update Global Cart Context
      setCart(updatedCart);

    }
  };

  return (
    <>
      <tr className="woo-next-cart-item" key={item.productId}>
        {/* cross Icon */}
        <th className="woo-next-cart-element woo-next-cart-el-close">
          <span
            className="woo-next-cart-close-icon"
            onClick={(e) => handleRemoveItem(e,item.productId)}
          >
            <i className="fa fa-times-circle" aria-hidden="true" />
          </span>
        </th>

        {/* Product Image */}
        <td className="woo-next-cart-element">
        {item.image && item.image.sourceUrl && (
            <img
              width="64"
              src={item.image.sourceUrl}
              srcSet={item.image.srcSet}
              alt={item.image.title}
            />
          )}
        </td>

        {/* Product Name */}
        <td className="woo-next-cart-element">{item.name}</td>

        {/* Product Price */}
        <td className="woo-next-cart-element">{ ToFixedNum(item.totalPrice) }</td>

        {/* Product Quantity */}
        <td className="woo-next-cart-element">
          <input
            type="number"
            value={productCount}
            min="1"
            className="woo-next-cart-qty-input"
            onChange={handleProductChange}
          />
        </td>

        {/* Product Total Price */}
        <td className="woo-next-cart-element">  { ToFixedNum(item.totalPrice) }</td>
      </tr>
    </>
  );
};

export default CartItem;
