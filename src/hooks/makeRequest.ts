import axios from 'axios';
// DEPRECATED --- do wyrzucenia
export const makeRequest = async (method: 'POST' | 'GET' | 'PUT' | 'DELETE', url: string, data?: unknown) => {
  const token = localStorage.getItem('accessToken');

  if (method === 'POST') {
    return  axios.post(`http://localhost:4000${url}`, data, {
      headers: {
        Authorization: token
      }
    });
  }
  if (method === 'GET') {
    return  axios.get(`http://localhost:4000${url}`, {
      headers: {
        Authorization: token
      }
    });
  }
  if (method === 'PUT') {
    return  axios.put(`http://localhost:4000${url}`, data, {
      headers: {
        Authorization: token
      }
    });
  }
  if (method === 'DELETE') {
    return  axios.delete(`http://localhost:4000${url}`, {
      headers: {
        Authorization: token
      }
    });
  }
};
