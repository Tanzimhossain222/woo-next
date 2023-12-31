import Link from "next/link"
import CartIcon from "./cart/CartIcon"
import { useState } from "react";

const Nav = () => {

	const [ show, setDisplay ] = useState( false );

	return (
		<nav className="woo-next-menu-container navbar-dark bg-primary">
			{/*Branding*/}
			<div className="woo-next-branding">
				<Link href="/" className=""> WooNext </Link>
			</div>  	

			{/*Navigation menu*/}
			<div className={ `woo-next-sub-menu-wrap ${ show ? 'show' : '' }` } id="">
				<ul className="navbar-nav">
					<li className="nav-item">
						<Link className="nav-link" href="/categories">Categories</Link>
					</li>
					<li className="nav-item">
						<Link className="nav-link" href="#">My Account</Link>
					</li>
				</ul>
			</div>

		{/*	Cart and Menu button*/}
		<div className="woo-next-cart-and-menu-btn">
			{/*Cart Icon*/}
			<div>
				<CartIcon />
			</div>
			{/*Menu toggle button for mobile*/}
			<button
				onClick={ () => setDisplay( ! show ) }
				className="woo-next-menu-btn" type="button" aria-label="Toggle navigation">
				<span className="navbar-toggler-icon"></span>
			</button>
		</div>
		</nav>
	)
};


export default Nav