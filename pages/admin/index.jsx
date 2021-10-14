import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import { useContext, useEffect, useState } from "react";
import Chart from "../../components/chart/Chart";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import LayoutAdmin from "../../components/LayoutAdmin";
import axios from "axios";
import { Store } from "../../context/Store";
import User from "../../models/User";
import Order from "../../models/Order";
import dbConnect from "../../utils/database";

// 'users' & 'orders' comes from SSR
function Index({ users, orders }) {
    // console.log('users & orders: ', users, orders)
    const [userStats, setUserStats] = useState([])
    // CONTEXT-API
    const { state } = useContext(Store)
    const { userInfo } = state;

    useEffect(() => {
        const MONTHS = [
            "Jan",
            "Feb",
            "Mar",
            "Abr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        const getStats = async () => {
            try {
                // Response Ex: [{"id": 5, "total": 3}, {...}]
                const response = await axios.get("api/users/getStats", {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                        authorization: `Bearer ${userInfo.token}`,
                    },
                });
                // console.log('data before sort: ', response.data)
                // Sort the array minor to max
                const res = response.data.sort(function (a, b) {
                    return a._id - b._id;
                });
                // console.log('data after sort: ', res)
                // Make a new array which contains objects for each month and its Total new Users
                // Ex:[ 0: {name: 'Aug', Total Users: 5}, 1: {...}]
                res.map((object) => {
                    return setUserStats((prev) => [...prev, { name: MONTHS[object._id - 1], "Total Users": object.total }])
                })
            } catch (error) {
                console.error(error)
            }
        }
        getStats()
        return () => {
            setUserStats([])
        }
    }, [])
    // console.log('data stats in statet: ', userStats)
    return (
        <LayoutAdmin title="Admin" currentSection="Home" >
            <div className="home">
                <br />
                <FeaturedInfo />
                <Chart data={userStats} title="User Analytics per Month" grid dataKey="Total Users" />
                <div className="homeWidgets">
                    <WidgetSm users={users} />
                    <WidgetLg orders={orders} />
                </div>
            </div>
        </LayoutAdmin>
    )
}
export default Index

// Get data from server side before rendering page
export async function getServerSideProps(context) {
    try {
        await dbConnect();
        const responseUsers = await User.find({}).limit(5) // GET FIRST 5 users
        const responseOrders = await Order.find({}).limit(5) // GET FIRST 5 orders

        const users = responseUsers.map((doc) => {
            const user = JSON.parse(JSON.stringify(doc))
            return user
        })
        const orders = responseOrders.map((doc) => {
            const order = JSON.parse(JSON.stringify(doc))
            return order
        })
        return {
            props: {
                users, orders
            }
        }
    } catch (error) {
        return {
            props: {
                users: null, orders: null, error: "Something went wrong while fetching data", error: JSON.stringify(error)
            },
            deferOnClientSideNavigation: true,
        }
    }
}
