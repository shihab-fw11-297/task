import { useState } from 'react';

const useUpdateData = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const updateData = async (url, formData) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(url, {
                method: 'PUT', // Assuming you're using PUT method for updating data
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update data');
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error.message);
        }
    };

    return { loading, error, updateData };
};

export default useUpdateData;
