import axios from 'axios';

jest.mock('axios');

axios.create = jest.fn(() => axios);
