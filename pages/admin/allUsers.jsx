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
import User from '../../models/User';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import dynamic from 'next/dynamic';

function AllUsers({ users, loader }) {
    // console.log('SSR props: ', users)
    const { state } = useContext(Store)
    const { userInfo } = state;

    const { enqueueSnackbar } = useSnackbar()
    const router = useRouter()
    const [loading, setLoading] = useState(true);
    // console.log(users)
    useEffect(() => {
        if (loader === false) {
            setLoading(false)
        }
    }, [loader])
    
    const upToAdminHandler = async (event, disabled, id) => {
        event.preventDefault()
        if (!disabled) {
            // Make PUT request to API, then updated isAdmin to 'True'
            try {
                const { data } = await axios.put(`/api/users/update/${id}`, {}, {
                    headers: { authorization: `Bearer ${userInfo.token}` }
                })
                enqueueSnackbar(data, { variant: 'info' })
            } catch (error) {
                enqueueSnackbar(error.message, { variant: 'error' })
                // console.log(error)
            }
            router.push('/admin/allUsers')
        }
    }

    const deleteHandler = async (id) => {
        try {
            const { data } = await axios.delete(`/api/users/delete/${id}`, {
                headers: { authorization: `Bearer ${userInfo.token}` }
            })
            enqueueSnackbar(data, { variant: 'info' })
        } catch (error) {
            enqueueSnackbar(error.message, { variant: 'error' })
            // console.log(error)
        }
        router.push('/admin/allUsers')
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
        { field: 'email', headerName: "E-mail", width: 200 },
        { field: 'name', headerName: "Username", width: 150 },
        { field: 'isAdmin', headerName: "Admin", width: 150 },
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
                        <Tooltip title="Up to Admin">
                            <span>
                                <IconButton disabled={params.row.isAdmin ? true : false} onClick={(event) => { return upToAdminHandler(event, params.row.isAdmin, params.row._id) }} aria-label="Up to Admin">
                                    <AdminPanelSettingsIcon style={params.row.isAdmin ? { color: 'gray' } : { color: '#2a7ade', cursor: 'Pointer' }} />
                                </IconButton>
                            </span>
                        </Tooltip>
                    </>
                );
            },
        },
    ];

    return (
        <LayoutAdmin title="All Users" currentSection={'Users'}>
            <div className="home">
                <br />
                {!loading ?
                    (
                        <div style={{ height: 400, width: '100%', color: 'blue' }}>
                            <DataGrid 
                                rows={users}
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

export default dynamic(() => Promise.resolve(AllUsers), { ssr: false })

// Get data from server side before rendering page
export async function getServerSideProps() {
    try {
        await dbConnect();
        const response = await User.find({}) // GET ALL product
        const users = response.map((doc) => {
            const user = JSON.parse(JSON.stringify(doc))
            return user
        })
        return {
            props: {
                users, loader: false
            }
        }

    } catch (error) {
        // console.log(error)
    }
}
