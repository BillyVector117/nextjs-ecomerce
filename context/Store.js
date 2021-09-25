import Cookies from "js-cookie";
import { createContext, useReducer } from "react";
// Create context
export const Store = createContext();
// Define an initial state
const initialState = {
    darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
    cart: {
        cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : []
    },
    userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null
}
// Define reducer function
function reducer(state, action) {
    switch (action.type) {
        case 'DARK_MODE_ON':
            return { ...state, darkMode: true }
        case 'DARK_MODE_OFF':
            return { ...state, darkMode: false }
        case 'CART_ADD_ITEM': {
            // GET PAYLOAD ITEM
            const newItem = action.payload; // newItem refers an received Object Product Model properties
            // ALREADY EXIST NEW ITEM ?
            // Search in state if already existsthis item (Return object if is true)
            const existItem = state.cart.cartItems.find((item) =>
                item._id == newItem._id
            );
            // console.log('Is this item already in car?: ', existItem)
            // SET NEW ITEM (named as 'cartItems to send directly through props )
            // Replace the item with the same ID with the new one
            // const cartItems = existItem ? state.cart.cartItems : [...state.cart.cartItems, newItem]

            // TO ADD NO MATTER PRODUCT IS REPETEAD
            const cartItems = existItem ? state.cart.cartItems.map((item) =>
                item.name === existItem.name ? newItem : item
            ) : [...state.cart.cartItems, newItem];
            // console.log('cart items: ', cartItems)
            Cookies.set('cartItems', JSON.stringify(cartItems))
            return { ...state, cart: { ...state.cart, cartItems } } // cartItems: cartItems
        }
        case 'CART_REMOVE_ITEM': {
            const itemToDelete = action.payload
            const cartItems = state.cart.cartItems.filter((item) => { return item._id !== itemToDelete._id })
            // console.log('Cart after deletion: ', cartItems)
            Cookies.set('cartItems', JSON.stringify(cartItems))

            return { ...state, cart: { ...state.cart, cartItems } }
        }
        case 'USER_LOGIN': {
            Cookies.set('userInfo', JSON.stringify(action.payload))
            return { ...state, userInfo: action.payload }
        }
        case 'USER_LOG_OUT': {
            return { ...state, userInfo: null, cart: { cartItems: [] } }
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




