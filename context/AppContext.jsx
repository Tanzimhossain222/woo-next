import React, { useEffect, useState } from 'react'


export const AppContext  = React.createContext([
    {},
    () => {}
])


export const AppProvider = (props) => {
    const [cart, setCart] = useState({});

    useEffect(() => {
        if (process.browser) {
          const cartData = localStorage.getItem('woo-next-cart');
          if (cartData) {
            setCart(JSON.parse(cartData));
          }
        }
      }, []);
      

    return (
        <AppContext.Provider value={[cart, setCart]}>
            {props.children}
        </AppContext.Provider>
    )
}
