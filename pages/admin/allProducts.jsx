import { DataGrid } from '@mui/x-data-grid';
import { useContext, useEffect, useState } from "react";
import LayoutAdmin from "../../components/LayoutAdmin";
import { DeleteOutline } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import dbConnect from "../../utils/database";
import Tooltip from '@mui/material/Tooltip';
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import { Store } from '../../context/Store';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import Product from '../../models/Product';
import dynamic from 'next/dynamic';
import ButtonCreateProduct from '../../elements/ButtonCreateProduct';

function AllProducts({ products, loader }) {
    //console.log('SSR props: ', products)
    const { state } = useContext(Store)
    const { userInfo } = state;

    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (loader === false) {
            setLoading(false)
        }
    }, [loader])

    const deleteHandler = async (id) => {
        try {
            const { data } = await axios.delete(`/api/products/delete/${id}`, {
                headers: { authorization: `Bearer ${userInfo.token}` }
            })
            enqueueSnackbar(data, { variant: 'info' })
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' })
            // console.log(error)
        }
        router.push('/admin/allProducts')
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
            field: "name",
            headerName: "Name",
            width: 250,
            renderCell: (params) => {
                return (
                    params.row.name ?
                        (<Tooltip title={params.row.name}><p>{params.row.name.slice(0, 20) + '...'} </p></Tooltip>) :
                        (<p>...</p>)
                );
            },
        },


        {
            field: "price",
            headerName: "Price",
            width: 120,
            renderCell: (params) => {
                return (
                    <p>${params.row.price} </p>
                );
            },
        },
        { field: 'brand', headerName: "Brand", width: 140 },
        { field: 'countInStock', headerName: "Stock Units", width: 180 },
        { field: 'createdAt', headerName: "Created Date", width: 180 },
        {
            field: "action",
            headerName: "Action",
            width: 180,
            // 'params' has access to all Object properties
            renderCell: (params) => {
                return (
                    <>

                        <Tooltip title="Delete">
                            <IconButton aria-label="delete" onClick={() => { return deleteHandler(params.row._id) }}>
                                <DeleteOutline
                                    style={{ color: 'red', cursor: 'pointer' }}
                                />
                            </IconButton>
                        </Tooltip>

                    </>
                );
            },
        },
    ];

    return (
        <LayoutAdmin title="All Products" currentSection={'Products'}>
            <div className="home">
                <br />
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '25px' }}>
                    <ButtonCreateProduct  />
                </div>
                {!loading ?
                    (
                        <div style={{ height: 400, width: '100%', color: 'blue' }}>
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

export default dynamic(() => Promise.resolve(AllProducts), { ssr: false })

// Get data from server side before rendering page
export async function getServerSideProps() {
    try {
        await dbConnect();
        const response = await Product.find({}) // GET ALL products
        const products = response.map((doc) => {
            const product = JSON.parse(JSON.stringify(doc))
            return product
        })
        return {
            props: {
                products, loader: false
            }
        }

    } catch (error) {
        // console.log(error)
    }
}