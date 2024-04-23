import DynamicTable from "../component/Table";
import { Button } from "@mui/material";
import useFetch from "../utill/useFetch";
import Header from '../component/Header';
import * as React from 'react';
import usePostRequest from '../utill/usePostRequest'; // Import the custom hook
import useUpdateData from '../utill/useUpdateData'; // Import the custom hook
import useDeleteData from '../utill/useDeleteData'; // Import the custom hook

const Home = () => {
    const { data, loading, reFetch } = useFetch(`http://localhost:2000/api/v1/product/fetch`);
    const { postData } = usePostRequest(); // Use the custom hook
    const { updateData } = useUpdateData();
    const { deleteData } = useDeleteData();
    
    const header = ["id", "title", "price", "description", "published", "createdAt", "action"];
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = React.useState(false);
    const [selectId, setSelectId] = React.useState("");

    const [formData, setFormData] = React.useState({
        title: '',
        price: 0,
        description: '',
        published: true,
    });

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false)
    };

    const editData = async (id) => {
        setEdit(true)
        setSelectId(id);
        const response = await fetch(`http://localhost:2000/api/v1/product/fetch/${id}`);
        const fetchedData = await response.json();
        console.log(fetchedData)
        setFormData(fetchedData.product); // Set fetched data to form data
        handleOpen(); // Open the modal with fetched data
    };

    const deleteDataById = async (id) => {
        await deleteData(`http://localhost:2000/api/v1/product/delete/${id}`);
        await reFetch(); // reFetch data after deletion
    };


    function createTableData(id, title, price, description, published, createdAt, action) {
        return {
            id,
            title,
            price,
            description,
            published,
            createdAt,
            action: (
                <>
                    <Button color="primary" onClick={() => editData(id)}>
                        Edit
                    </Button>
                    <Button color="secondary" onClick={() => deleteDataById(id)}>
                        Delete
                    </Button>
                </>
            ),
        };
    }

    const tableData = data?.map((row, i) => {
        return createTableData(
            row.id,
            row.title,
            row.title,
            row.description,
            row.published ? "Published" : "Not Published",
            row.createdAt,
        );
    });

    const handleModalClose = () => {
        reFetch(); // reFetch data when modal closes
    };

    const handleSubmit = async (event) => {
        if (!edit) {
            event.preventDefault();
            await postData('http://localhost:2000/api/v1/product/create', formData); // Call postData function from the custom hook
            await handleModalClose();
            handleClose();
            setFormData({
                title: '',
                price: 0,
                description: '',
                published: true,
            })
        } else {
            event.preventDefault();
            await updateData(`http://localhost:2000/api/v1/product/update/${selectId}`, formData); // Update API call
            await handleModalClose();
            handleClose();
            setEdit(false); // Reset edit mode
            setFormData({
                title: '',
                price: 0,
                description: '',
                published: true,
            });
            setSelectId("")
        }
    };

    return (
        <>
            <Header handleSubmit={handleSubmit} open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} formData={formData} setFormData={setFormData} />
            <DynamicTable header={header} data={tableData} open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose} />
        </>
    )
}

export default Home;