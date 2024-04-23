import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function BasicModal({ open, handleClose, handleSubmit, formData, setFormData }) {
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

   

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" gutterBottom>
                        Add Product
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <div style={{ marginBottom: 16 }}>
                            <label htmlFor="title" style={{ marginRight: 8 }}>Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                style={{ width: '100%', padding: 8 }}
                            />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label htmlFor="price" style={{ marginRight: 8 }}>Price:</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                style={{ width: '100%', padding: 8 }}
                            />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label htmlFor="description" style={{ marginRight: 8 }}>Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                style={{ width: '100%', padding: 8, resize: 'vertical' }}
                            />
                        </div>
                        <div style={{ marginBottom: 16 }}>
                            <label htmlFor="published" style={{ marginRight: 8 }}>Published:</label>
                            <input
                                type="checkbox"
                                id="published"
                                name="published"
                                checked={formData.published}
                                onChange={handleChange}
                            />
                        </div>
                        <Button type="submit" variant="contained">Submit</Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}
