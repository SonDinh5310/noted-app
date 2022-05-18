import { useState, useEffect } from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://noted-app-backend.herokuapp.com/api';

export const useFetch = (callParams) => {
    const [response, setResponse] = useState(undefined);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState('');

    const fetchData = async (params) => {
        try {
            const res = await axios.request(params);
            setResponse(res.data);
        } catch (error) {
            setErrorMsg(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(callParams);
    }, []);

    return { response, loading, errorMsg };
};
