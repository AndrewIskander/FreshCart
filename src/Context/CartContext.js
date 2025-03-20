import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let cartContext = createContext();
export let headers = { token: localStorage.getItem('userToken') }


export function CartContextProvider(props) {

    const [cartId, setCartId] = useState(null);
    const [numOfCartItems, setNumOfCartItems] = useState(0);

    async function getCart() {
        let response = await getLoggedUserCart();
        if (response?.data?.status === 'success') {
            setNumOfCartItems(response.data.numOfCartItems);
            setCartId(response.data.data._id);
        }
        console.log(response)
    }
    useEffect(() => {
        getCart();
    }, [])

    function addToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
            { productId: productId },
            { headers: headers })
            .then((response) => response)
            .catch((error) => error)
    }
    function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
            { headers: headers })
            .then((response) => response)
            .catch((error) => error)
    }
    function removeItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { headers: headers })
            .then((response) => response)
            .catch((error) => error)
    }
    function updateProductCount(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
            { count: count },
            { headers: headers })
            .then((response) => response)
            .catch((error) => error)
    }
 
    function onlinePayment(cartId, shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
            { shippingAddress: shippingAddress },
            { headers: headers })
            .then((response) => response)
            .catch((error) => error)
    }


    return <cartContext.Provider value={{ addToCart, getLoggedUserCart, removeItem, updateProductCount, onlinePayment, cartId, numOfCartItems, setNumOfCartItems }}>
        {props.children}
    </cartContext.Provider>
}



