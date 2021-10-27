
import { useStyles } from "../utils/styles"
import NextLink from 'next/link'
import axios from "axios"
import { useContext, useEffect } from "react"
import { useRouter } from 'next/router'
import { useSnackbar } from "notistack" // Pop-up messages
import { Controller, useForm } from "react-hook-form"
import { Grid, Input, InputAdornment, InputLabel } from "@mui/material"
import Image from 'next/image'
import dynamic from 'next/dynamic'
import {
    Button,
    CircularProgress,
    Link,
    List,
    ListItem,
    Typography,
    TextField,
} from "@material-ui/core";
import { Store } from "../context/Store"
function FormAddProduct({ handleClose }) {
    const classes = useStyles()
    const router = useRouter()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { redirect } = router.query; // login?redirect=/shipping in case a page redirect here to login
    // Context-API Access
    const { state } = useContext(Store)
    const { userInfo } = state;
    // react-hook-form
    const { handleSubmit, control, formState: { errors } } = useForm();


    const submitHandler = async ({ name, description, category, price, countInStock, brand }) => {
        closeSnackbar() // Close previous Pop-up message
        // console.log('sending data: ', { name, description, category, price: parseInt(price), countInStock: parseInt(countInStock), brand })
        try {
            const { data } = await axios.post('/api/products/create', { name, description, category, price: parseInt(price), countInStock: parseInt(countInStock), brand }, {
                headers: {
                    authorization: `Bearer ${userInfo.token}`
                }
            })
            // console.log('Product created: ', data)
            enqueueSnackbar('Product created successfully', { variant: 'success' })
            handleClose()
            return router.push('/admin/allProducts')
        } catch (error) {
            // console.log('ERROR', error.response)
            enqueueSnackbar(error.response.data ? error.response.data.message : error.message, { variant: 'error' })
        }
    }

    return (
        <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
            <Typography component="h1" variant="h1">
                Add a Product
            </Typography>
            <Grid container style={{ display: 'flex', flexWrap: 'wrap' }}>
                <Grid item md={6} xs={12}>
                    <List>
                        {/* Controller provided by react-hook-form */}
                        <ListItem>
                            <Controller
                                control={control}
                                name="name"
                                defaultValue=""
                                rules={{
                                    required: true,
                                    minLength: 5
                                }}
                                render={({ field }) => (
                                    <TextField variant="outlined"
                                        fullWidth
                                        autoComplete="on"
                                        {...field}
                                        id="name"
                                        label="Product name"
                                        inputProps={{ type: 'text' }}
                                        error={Boolean(errors.name)}
                                        helperText={errors.name ? errors.name.type === 'minLength' ? 'Be more explicit with the product name' : 'Product name is required' : ''}>
                                    </TextField>
                                )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                            <Controller
                                control={control}
                                name="description"
                                defaultValue=""
                                rules={{
                                    required: true,
                                    minLength: 5
                                }}
                                render={({ field }) => (
                                    <TextField variant="outlined"
                                        fullWidth
                                        autoComplete="on"
                                        {...field}
                                        id="description"
                                        label="Product description"
                                        inputProps={{ type: 'text' }}
                                        error={Boolean(errors.description)}
                                        helperText={errors.description ? errors.description.type === 'minLength' ? 'Be more explicit with the product description' : 'Product description is required' : ''}>
                                    </TextField>
                                )}
                            ></Controller>
                        </ListItem>
                        <ListItem>
                            <Controller
                                control={control}
                                name="category"
                                defaultValue=""
                                rules={{
                                    required: true,
                                    minLength: 5
                                }}
                                render={({ field }) => (
                                    <TextField variant="outlined"
                                        fullWidth
                                        autoComplete="on"
                                        {...field}
                                        id="category"
                                        label="Product category"
                                        inputProps={{ type: 'text' }}
                                        error={Boolean(errors.category)}
                                        helperText={errors.category ? errors.category.type === 'minLength' ? 'Be more explicit with the product category' : 'Product category is required' : ''}>
                                    </TextField>
                                )}
                            ></Controller>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item md={6} xs={12}>
                    <ListItem>
                        <Controller
                            control={control}
                            name="brand"
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2
                            }}
                            render={({ field }) => (
                                <TextField variant="outlined"
                                    fullWidth
                                    autoComplete="on"
                                    {...field}
                                    id="brand"
                                    label="Product brand"
                                    inputProps={{ type: 'text' }}
                                    error={Boolean(errors.brand)}
                                    helperText={errors.brand ? errors.brand.type === 'minLength' ? 'Be more explicit with the product brand' : 'Product brand is required' : ''}>
                                </TextField>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller
                            control={control}
                            name="price"
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 1
                            }}
                            render={({ field }) => (
                                <>
                                    <TextField
                                        fullWidth
                                        autoComplete="on"
                                        {...field}
                                        id="price"
                                        label="Product price $"
                                        inputProps={{ type: 'number' }}
                                        variant="standard"
                                        error={Boolean(errors.price)}
                                        helperText={errors.price ? errors.price.type === 'minLength' ? 'Set a correct value, please' : 'Product price is required' : ''} />
                                </>
                            )}
                        ></Controller>
                    </ListItem>
                    <ListItem>
                        <Controller
                            control={control}
                            name="countInStock"
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 1
                            }}
                            render={({ field }) => (
                                <TextField
                                    fullWidth
                                    autoComplete="on"
                                    {...field}
                                    id="countInStock"
                                    label="Stock #"
                                    inputProps={{ type: 'number' }}
                                    variant="standard"
                                    error={Boolean(errors.countInStock)}
                                    helperText={errors.countInStock ? errors.countInStock.type === 'minLength' ? 'Set a correct value, please' : 'Stock count is required' : ''} />
                            )}
                        ></Controller>
                    </ListItem>
                    {/* <ListItem>
                        <Controller

                            control={control}
                            name="image"
                            defaultValue=""
                            rules={{
                                required: true,
                            }}
                            render={({ field }) => (
                                <Input
                                    fullWidth
                                    autoComplete="on"
                                    {...field}
                                    id="image"
                                    label="Product Image"
                                    inputProps={{ type: 'file' }}
                                    error={Boolean(errors.image)}
                                    onChange={handleChange}

                                />
                            )}
                        ></Controller>
                    </ListItem> */}
                </Grid>
            </Grid>
            <List>
                <ListItem>
                    <Button variant="contained" type="submit" fullWidth color="primary">Accept</Button>
                </ListItem>

            </List>
        </form>
    )
}

export default FormAddProduct
