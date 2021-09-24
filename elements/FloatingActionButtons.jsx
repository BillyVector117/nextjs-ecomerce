import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function FloatingActionButtons({ icon, addToCartHandler, product }) {
    return (
        <Box onClick={() => {return addToCartHandler(product)}} sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab color="primary" aria-label="add">
                {icon === 'AddShoppingCartIcon' && (
                    <AddShoppingCartIcon />
                )}
            </Fab>
        </Box>
    );
}