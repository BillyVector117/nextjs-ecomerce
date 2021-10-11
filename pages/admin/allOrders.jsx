import { DataGrid } from '@mui/x-data-grid';
import { useContext } from "react";
import LayoutAdmin from "../../components/LayoutAdmin";
import { DeleteOutline } from "@mui/icons-material";
import dbConnect from "../../utils/database";
import Order from "../../models/Order";
import Tooltip from '@mui/material/Tooltip';

import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { Store } from '../../context/Store';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';

// 'products' comes from SSR response
function AllOrders({ products }) {
    // console.log('SSR props: ', products)
    const { state } = useContext(Store)
    const { userInfo } = state;
    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()
    const deleteHandler = async (id) => {
        try {
            const { data } = await axios.delete(`/api/orders/delete/${id}`, {
                headers: { authorization: `Bearer ${userInfo.token}` }
            })
            enqueueSnackbar(data, { variant: 'info' })

        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' })
            // console.log (error)
        }
        router.push('/admin/allOrders')

    }
    const columns = [
        // "field" property refers to Object name property of each array Object
        {
            field: "_id",
            headerName: "ID",
            width: 100,
            renderCell: (params) => {
                return (
                    params.row._id ?
                        (<Tooltip title={params.row._id}><p>{params.row._id.slice(0, 10) + '...'} </p></Tooltip>) :
                        (<p>...</p>)
                );
            },
        },
        {
            field: "shippingAddress",
            headerName: "User",
            width: 120,
            renderCell: (params) => {
                return (
                    params.row.shippingAddress ?
                        (<p>{params.row.shippingAddress.fullName} </p>) :
                        (<p>...</p>)
                );
            },
        },
        { field: "paymentMethod", headerName: "Payment", width: 150 },
        {
            field: "totalPrice",
            headerName: "Total",
            width: 120,
            renderCell: (params) => {
                return (
                    <p>${params.row.totalPrice} </p>
                );
            },
        },
        { field: 'isDelivered', headerName: "Delivered", width: 150 },
        { field: 'createdAt', headerName: "Date", width: 120 },
        { field: 'paidAt', headerName: "Paid At", width: 140 },
        {
            field: "paymentResult",
            headerName: "Status",
            width: 130,
            renderCell: (params) => {
                return (
                    params.row.paymentResult ?
                        (<Tooltip title={params.row.paymentResult.status}><p>{params.row.paymentResult.status} </p></Tooltip>) :
                        (<p>NO COMPLETED</p>)
                );
            },
        },
        {
            field: "action",
            headerName: "Action",
            width: 130,
            // 'params' has access to all Object properties
            renderCell: (params) => {
                return (
                    <>
                        <DeleteOutline onClick={() => { return deleteHandler(params.row._id) }}
                            style={{ color: 'red', cursor: 'pointer' }}
                        />
                    </>
                );
            },
        },
    ];

    return (
        <LayoutAdmin title="All Orders" currentSection={'Orders'}>
            <div className="home">
                <br />
                {products ?
                    (
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={products}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                checkboxSelection
                                getRowId={r => r._id}
                            />
                        </div>
                    ) :
                    (<CircularProgress />)}
            </div>
        </LayoutAdmin>
    )
}

export default AllOrders
// Get data from server side before rendering page
export async function getServerSideProps() {
    try {
        await dbConnect();
        const response = await Order.find({}) // GET ALL product
        const products = response.map((doc) => {
            const product = JSON.parse(JSON.stringify(doc))
            return product
        })
        return {
            props: {
                products, loader: true
            }
        }
    } catch (error) {
        // console.log(error)
    }
}
