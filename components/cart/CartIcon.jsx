import { AppContext } from "@/context/AppContext";
import Link from "next/link";
import { useContext } from "react";

const CartIcon = () => {
    const [cart, setCart] = useContext(AppContext);
    const productCount = (null !== cart && Object.keys(cart).length) ? cart.totalProductsCount : '';
    const totalPrice= (null !== cart && Object.keys(cart).length) ? cart.totalPrice : '';

    return (
        <>
        <Link href={'/cart'}>
            <div className="woo-next-cart-wrap">
                {totalPrice ? <span className="woo-next-cart-price">{totalPrice.toFixed(2)}</span> : ''}
                <span className="woo-next-cart-icon-container">
                    <i className="fa fa-shopping-cart woo-next-cart-icon"></i>
                   
                    {
                        productCount ? <span className="woo-next-cart-count">{productCount}</span> : ''
                    }
                </span>
            </div>
        </Link>
        </>
    )
    
}

export default CartIcon;