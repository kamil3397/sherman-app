import axios from "axios";


export const makeRequest = async (method: 'POST' | 'GET' | 'PUT' | 'DELETE', url: string, data?: unknown) => {
    const token = localStorage.getItem('accessToken');

    if (method === 'POST') {
        return await axios.post(`http://localhost:4000${url}`, data, {
            headers: {
                Authorization: token
            }
        })
    }
    if (method === 'GET') {
        return await axios.get(`http://localhost:4000${url}`, {
            headers: {
                Authorization: token
            }
        })
    }
    if (method === 'PUT') {
        return await axios.put(`http://localhost:4000${url}`, data, {
            headers: {
                Authorization: token
            }
        })
    }
    if (method === 'DELETE') {
        return await axios.delete(`http://localhost:4000${url}`, {
            headers: {
                Authorization: token
            }
        })
    }
}