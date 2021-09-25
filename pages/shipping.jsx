import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { Store } from "../context/Store";

function Shipping() {
    // Context-API Access
    const router = useRouter()
    const { state } = useContext(Store)
    const { userInfo } = state;
    useEffect(() => {
        if (!userInfo) {
            // push to /login but set a query at Url. 'redirect' refers to router.query 
            router.push('/login?redirect=/shipping')
        }
        
    }, [])
    /* router.push('/') */
    return (
        <div>
            Shopping page
        </div>
    )
}

export default Shipping
