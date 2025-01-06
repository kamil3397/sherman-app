import axios from 'axios';

// eslint-disable-next-line no-undef
axios.defaults.headers.common.Authorization = localStorage.getItem('accessToken');
export default axios;
