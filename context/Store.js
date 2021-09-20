import Cookies from "js-cookie";
import { createContext, useReducer } from "react";
// Create context
export const Store = createContext();
// Define an initial state
const initialState = {
    darkMode: Cookies.get('darkMode') === 'ON' ? true : false
}
// Define reducer function
function reducer(state, action) {
    switch (action.type) {
        case 'DARK_MODE_ON':
            return { ...state, darkMode: true }
        case 'DARK_MODE_OFF':
            return { ...state, darkMode: false }

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




