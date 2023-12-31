/**
 * Extracts and returns float value from a string.
 *
 * @param {string} string String
 * @return {any}
 */
export const getFloatVal = (string) => {
	if (typeof string === "string") {
	  const floatValue = string.match(/[+-]?\d+(\.\d+)?/g);
	  if (floatValue) {
		return parseFloat(parseFloat(floatValue[0]).toFixed(2));
	  }
	}
	return '';
};


/**
 * Add first product. Creates new cart if cart not available in local storage.
 *
 * @param {Object} product Product
 * @return {{totalProductsCount: number, totalProductsPrice: any, products: Array}}
 */
export const addFirstProduct = ( product ) => {

	let productPrice = getFloatVal( product.price );

	let newCart = {
		products: [],
		totalProductsCount: 1,
		totalProductsPrice: productPrice
	};

	const newProduct = createNewProduct( product, productPrice, 1 );
	newCart.products.push( newProduct ); // Add the new product to checkout array.

	// Add to local storage.
	localStorage.setItem( 'woo-next-cart', JSON.stringify( newCart ) );

	return newCart;
};

/**
 * Create a new product object. This object will have all the required fields. 
 *
 * @param {Object} product Product
 * @param {Integer} productPrice Product Price
 * @param {Integer} qty Quantity
 * @return {{image: *, productId: *, totalPrice: number, price: *, qty: *, name: *}}
 */
export const createNewProduct = ( product, productPrice, qty ) => {

	return  {
		productId: product.productId,
		image: product.image,
		name: product.name,
		price: productPrice,
		qty,
		totalPrice: parseFloat( ( productPrice * qty ).toFixed( 2 ) )
	}; 

};

/**
 * Updates the existing cart with new item. 
 *
 * @param {Object} existingCart Existing Cart.
 * @param {Object} product Product.
 * @param {Integer} qtyToBeAdded Quantity.
 * @param {Integer} newQty New Qty to be updated.
 * @return {{totalProductsCount: *, totalProductsPrice: *, products: *}}
 */
export const updateCart = ( existingCart, product, qtyToBeAdded, newQty = false  ) => {

	const updatedProducts = getUpdatedProducts( existingCart.products , product, qtyToBeAdded, newQty );

	// Calculate Total Products & Total Cart Amount 
	const addPrice = (total, item) => {
		total.totalPrice += item.totalPrice;
		total.qty += item.qty;

		return total;
	};

	// Loop through the updated product array and add the totalPrice of each item to get the totalPrice
	let total = updatedProducts.reduce( addPrice, { totalPrice: 0, qty: 0 } );

	const updatedCart = {
		products: updatedProducts,
		totalProductsCount: parseInt( total.qty ),
		totalProductsPrice: parseFloat( total.totalPrice )
	};

	// Add to local storage.
	localStorage.setItem( 'woo-next-cart', JSON.stringify( updatedCart ) );

	return updatedCart;
};

/**
 * Get updated products array by comparing existing products in cart and new product. 
 * Update the product if it exists else, 
 * add the new product to existing cart, if the product is new. 
 *
 * @param {Object} existingProductsInCart Existing product in cart object
 * @param {Object} product Product 
 * @param {Integer} qtyToBeAdded Quantity
 * @param {Integer} newQty New qty of the product (optional)
 * @return {*[]}
 */
export const getUpdatedProducts = ( existingProductsInCart, product, qtyToBeAdded, newQty = false ) => {

	// Check if the product already exits in the cart.
	const productExitsIndex = isProductInCart( existingProductsInCart, product.productId );

	// If product exits ( index of that product found in the array ), update the product quantity and totalPrice
	if ( -1 < productExitsIndex ) {
		let updatedProducts = existingProductsInCart;
		let updatedProduct = updatedProducts[ productExitsIndex ];

		// If have new qty of the product available, set that else add the qtyToBeAdded
		updatedProduct.qty = ( newQty ) ? parseInt( newQty ) : parseInt( updatedProduct.qty + qtyToBeAdded );
		updatedProduct.totalPrice = parseFloat( ( updatedProduct.price * updatedProduct.qty ).toFixed( 2 ) );

		return  updatedProducts;
	} else {

		// If product not found push the new product to the existing product array.
		let productPrice = getFloatVal( product.price );
		const newProduct = createNewProduct( product, productPrice, qtyToBeAdded );
		existingProductsInCart.push( newProduct );

		return existingProductsInCart;
	}
};

/**
 * Returns index of the product if it exists. 
 *
 * @param {Object} existingProductsInCart Existing Products.
 * @param {Integer} productId Product id.
 * @return {number | *} Index Returns -1 if product does not exist in the array, index number otherwise
 */
const isProductInCart = ( existingProductsInCart, productId ) => {

	const returnItemThatExits = ( item, index ) => {
		if ( productId === item.productId ) {
			return item;
		}
	};

	// This new array will only contain the product which is matched. 
	const newArray = existingProductsInCart.filter( returnItemThatExits );

	return existingProductsInCart.indexOf( newArray[0] );
};


/**
 *  This function used to remove an item from the cart. 
 * Need to pass the cart and product id to remove from the cart. 
 * @param {Integer} productId 
 * @returns {Object} Returns updated cart.
 */
export const removeItemFromCart = ( productId ) => {
	// Get the existing cart data from local storage if any
	let existingCart = localStorage.getItem('woo-next-cart' );
	existingCart = JSON.parse( existingCart );

	//if there is only one item in the cart, delete the cart.
	if ( 1 === existingCart.products.length ) {
		localStorage.removeItem( 'woo-next-cart' );
		return null;
	}

	// Check if the product already exits in the cart.
	const productExitsIndex = isProductInCart( existingCart.products, productId );

	// If product to be removed exits
	if ( -1 < productExitsIndex ) {
		const productToBeRemoved = existingCart.products[ productExitsIndex ];
		const qtyToBeRemovedFromTotal = productToBeRemoved.qty;
		const priceToBeDeductedFromTotal = productToBeRemoved.totalPrice;

		// Remove that product from the array and update the total price and total quantity of the cart
		let updatedCart = existingCart;
		updatedCart.products.splice( productExitsIndex, 1 );
		updatedCart.totalProductsCount = updatedCart.totalProductsCount - qtyToBeRemovedFromTotal;
		updatedCart.totalProductsPrice = updatedCart.totalProductsPrice - priceToBeDeductedFromTotal;


		// Add to local storage.
		localStorage.setItem( 'woo-next-cart', JSON.stringify( updatedCart ) );

		return updatedCart;
	} else {
		return existingCart;
	}

}