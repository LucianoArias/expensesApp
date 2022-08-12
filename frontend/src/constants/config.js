import { QueryClient } from 'react-query';
const queryClient = new QueryClient();

const AXIOS_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://nucbaexpensesapp.herokuapp.com/api'
    : 'http://localhost:5000/api/';
export { AXIOS_URL, queryClient };
