import { useState } from 'react';
import axios from 'axios';

const useDeleteData = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const deleteData = async (url) => {
        setLoading(true);
        setError(null);

        try {
            await axios.delete(url);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return { loading, error, deleteData };
};

export default useDeleteData;
