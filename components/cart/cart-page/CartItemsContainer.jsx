import { AppContext } from "@/context/AppContext";
import { useContext, useEffect } from "react";
import CartItem from "./CartItem";

const CartItemsContainer = () => {
  const [cart, setCart] = useContext(AppContext);

  /**
   * Use useEffect to prevent initial empty string value on page load
   * it helps to prevent empty string value on page reload
   */
  useEffect(() => {
    if (cart && cart.products && cart.products.length > 0) {
      //
    }
  }, [cart]);

  // Handle Remove Item from Cart
  const handleRemoveItem = (e) => {
    // Todo update cart
    console.log("handleRemoveItem");
  };

  return (
    <>
      <>
        {cart && cart.products && cart.products.length > 0 ? (
          <div className="woo-next-cart-wrapper container">
            <h1 className="woo-next-cart-heading mt-5">Cart</h1>
            <table className="table table-hover">
              <thead>
                <tr className="woo-next-cart-header-container">
                  <th className="woo-next-cart-heading" scope="col" />
                  <th className="woo-next-cart-heading" scope="col" />
                  <th className="woo-next-cart-heading" scope="col">Product</th>
                  <th className="woo-next-cart-heading" scope="col">Price</th>
                  <th className="woo-next-cart-heading" scope="col">Quantity</th>
                  <th className="woo-next-cart-heading" scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((item) => (
                  <CartItem key={item.productId} item={item} setCart={setCart} handleRemoveItem={handleRemoveItem} />
                ))}
              </tbody>
            </table>
            {/* Cart Total */}
            <div className="row woo-next-cart-total-container mt-5">
                <div className="col-6">
                    <h2>Cart Total</h2>
                    <table className="table table-hover">
                        <tbody>
                            <tr className="table-light">
                                <td className="woo-next-cart-element-total">Subtotal</td>
                                <td className="woo-next-cart-element-amt">{cart.totalProductsPrice}</td>
                            </tr>
                            <tr className="table-light">
                                <td className="woo-next-cart-element-total">Total</td>
                                <td className="woo-next-cart-element-amt">{cart.totalProductsPrice}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </>
    </>
  );
}

export default CartItemsContainer;
