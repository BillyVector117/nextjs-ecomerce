import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function FloatingActionButtons({ icon }) {
    return (
        <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab color="primary" aria-label="add">
                {icon === 'AddShoppingCartIcon' && (
                    <AddShoppingCartIcon />

                )}
            </Fab>

        </Box>
    );
}