import { useState, useContext } from "react";

import Link from "next/link"
import { AppContext } from "@/context/AppContext";
import { addFirstProduct } from "@/functions";

const AddToCartButton = (props) => {
    const { product } = props;
    const [cart, setCart] = useState(AppContext);

    const handleAddCart =()=>{
       if(process.browser) {
        let existingCart = JSON.parse(localStorage.getItem('woo-next-cart'));

        // If cart has item(s) already, check if this product exists there or not
        if(existingCart) {

        }else {
            /**
             * If No Items in the cart, create an empty array and add one.
             */
            const newCart = addFirstProduct(product);
            setCart(newCart);
        }
       }
    }

  return (
    <>
    <button className="btn btn-secondary" onClick={handleAddCart}>Add to cart</button>
    </>
  )
}

export default AddToCartButton