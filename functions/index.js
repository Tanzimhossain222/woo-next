/**
 * This function will return the float value from the string
 * @param {string} string
 * @returns {number} float value
 * @example getFloatVal('123.45'); // 123.45
 */
export const getFloatVal = (string) => {
    let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];
    console.log(floatValue);
    return (null !== floatValue) ? parseFloat(parseFloat(floatValue)) : '';
}


/**
 *  This function will return the products count and total price and other details
 * use localStorage to store the cart data
 * @param {object} product 
 * @returns  {object} cart object
 */
export const addFirstProduct = (product) => {
    let productPrice = getFloatVal(product.price);

    // Create an empty array
    let newCart = {
        products: [],
        totalProductsCount: 1,
        totalPrice: productPrice
    } 

    const newProduct = createNewProduct(product, productPrice, 1);
    newCart.products.push(newProduct); // push new product to products array

    // Add to local storage
    localStorage.setItem('woo-next-cart', JSON.stringify(newCart)); // Set cart Data

    return newCart; // Return new cart
}


/**
 * This function will create a new product object.
 * @param {object} product
 * @param {number} productPrice 
 * @param {number} qty 
 * @returns {object} new product object
 */
export const createNewProduct = (product, productPrice, qty) => {
    return {
        id: product.id,
        name: product.name,
        price: productPrice,
        totalPrice: parseFloat(parseFloat(productPrice * qty)).toFixed(2),
        qty,
        image: product.image
    } // Return new Product Structure
}