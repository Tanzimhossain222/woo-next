import React, { useEffect, useState } from 'react'


export const AppContext = React.createContext([
    {},
    () => {}
])


export const AppProvider = (props) => {
    const [cart, setCart] = useState(null);

    useEffect(()=>{
        if(process.browser) {
            let cardData = localStorage.getItem('woo-next-cart');
            cardData = null !== cardData ? JSON.parse(cardData) : '';
            
            if(null !== cardData && '' !== cardData) {
                setCart(cardData);
            }
        }
    }, []);

    return (
        <AppContext.Provider value={[cart, setCart]}>
            {props.children}
        </AppContext.Provider>
    )
}
