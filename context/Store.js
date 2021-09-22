import Cookies from "js-cookie";
import { createContext, useReducer } from "react";
// Create context
export const Store = createContext();
// Define an initial state
const initialState = {
    darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
    cart: {
        cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : []
    }
}
// Define reducer function
function reducer(state, action) {
    switch (action.type) {
        case 'DARK_MODE_ON':
            return { ...state, darkMode: true }
        case 'DARK_MODE_OFF':
            return { ...state, darkMode: false }
        case 'CART_ADD_ITEM': {
            // GET NEW ITEM
            const newItem = action.payload;
            // ALREADY EXIST NEW ITEM ?
            // Search in state if already existsthis item (Return object if is true)
            const existItem = state.cart.cartItems.find((item) =>
                item._id == newItem._id
            );
            console.log('exist items: ', existItem)
            // SET NEW ITEM
            // Replace the item with the same ID with the new one
            const cartItems = existItem ? state.cart.cartItems : [...state.cart.cartItems, newItem]

            /*  TO ADD NO MATTER PRODUCT IS REPETEAD
            const cartItems = existItem ? state.cart.cartItems.map((item) => {
                item.name === existItem.name ? newItem : item
            }) : [...state.cart.cartItems, newItem]; */
            console.log('cart items: ', cartItems)
            Cookies.set('cartItems', JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } } // cartItems: cartItems
        }
        default:
            break;
    }
}

// Create Store provider that allows to wrap all components inside StoreProvider
export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}




