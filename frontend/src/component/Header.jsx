import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import BasicModal from './Modal';

const pages = ['Products', 'Pricing', 'Blog'];

function Header({ handleSubmit, open, handleOpen, handleClose, formData, setFormData }) {

    return (
        <Container maxWidth="lg">
            <Toolbar sx={{ display: 'flex', justifyContent: "space-between" }} disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component="a"
                    href="#app-bar-with-responsive-menu"
                    sx={{
                        mr: 2,
                        display: { xs: 'none', md: 'flex' },
                        fontFamily: 'Helvetica Neue, sans-serif',
                        fontWeight: 700,
                        letterSpacing: '.3rem',
                        color: 'inherit',
                        textDecoration: 'none',
                    }}
                >
                    Product Details
                </Typography>

                <Box sx={{ flexGrow: 0, ml: 2 }}> {/* Added ml: 2 for margin */}
                    <Button variant="contained" onClick={handleOpen} >Add Product</Button>
                </Box>
            </Toolbar>
            <BasicModal open={open} handleOpen={handleOpen} handleClose={handleClose} handleSubmit={handleSubmit} formData={formData} setFormData={setFormData} />
        </Container>
    );
}

export default Header;
