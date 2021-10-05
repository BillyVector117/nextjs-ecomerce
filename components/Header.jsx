import { AppBar, Toolbar, Typography, Switch, Badge, Button, Menu, MenuItem } from '@material-ui/core'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStyles } from '../utils/styles'
import NextLink from 'next/link'
import { useState, useContext } from 'react';
import { Store } from '../context/Store';
import Cookies from 'js-cookie';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router';
function Header() {
    const router = useRouter()
    const classes = useStyles();
    const { state, dispatch } = useContext(Store)
    const { darkMode, cart, userInfo } = state; // For toggle dark mode button

    const handlerdarkModeChange = () => {
        dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' })
        const newDarkMode = !darkMode;
        Cookies.set('darkMode', newDarkMode ? 'ON' : 'OFF')
    }
    // This two functions allows to work normally Menu tag (MaterialUI) 
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const loginHandleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const loginHandleClose = (event, redirect) => {
        setAnchorEl(null);
        if (redirect) {
            router.push(redirect)
        }
    };
    // For logging out
    const logOutClickHandler = () => {
        setAnchorEl(null);
        dispatch({ type: 'USER_LOG_OUT' });
        Cookies.remove('userInfo');
        Cookies.remove('cartItems');
        router.push('/')
    };

    // console.log('cart length', cart.cartItems)
    return (
        <AppBar position="static" className={classes.navbar} >
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>
                    <Typography className={classes.brand} style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                        <NextLink href="/">
                            <a>Shop App</a>
                        </NextLink>
                    </Typography>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Switch checked={darkMode} onChange={handlerdarkModeChange}></Switch>
                    {/* <CustomizedSwitch darkMode={darkMode} handlerdarkModeChange={handlerdarkModeChange}></CustomizedSwitch> */}
                    <NextLink href="/cart">
                        <a>
                            <Badge style={{ bottom: '20px' }} color="secondary" badgeContent={cart.cartItems.length > 0 ? cart.cartItems.length : 0}></Badge>
                            <ShoppingCartIcon /> </a>
                    </NextLink>
                    {
                        userInfo ? (
                            <>
                                <Button className={classes.navbarButton} id="basic-button"
                                    aria-controls="basic-menu"
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={loginHandleClick}>
                                    {userInfo.name}
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={loginHandleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={(event) => { return loginHandleClose(event, '/profile') }}>Profile</MenuItem>
                                    <MenuItem onClick={(event) => { return loginHandleClose(event, '/order-history') }}>Order History</MenuItem>
                                    <MenuItem onClick={logOutClickHandler}>Logout</MenuItem>
                                </Menu>
                            </>
                        ) :
                            (
                                <Typography>
                                    <NextLink href="/login">
                                        <a>Login</a>
                                    </NextLink>
                                </Typography>
                            )
                    }
                </div>
            </Toolbar>
        </AppBar>
    )
}

export default dynamic(() => Promise.resolve(Header), { ssr: false })
