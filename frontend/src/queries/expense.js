import { useQuery, useMutation } from 'react-query';
import Ax from '../utils/Axios';

const deleteEx = async (params) => {
  return await Ax.delete(`expense/delete/${params}`);
};

const getExs = async (params) => {
  return await Ax.get('expenses', { params: params }).catch((e) =>
    console.log(e)
  );
};

const postEx = async (params) => {
  return await Ax.post('expense', params);
};
const useExpenseDelete = () => useMutation('deleteEx', deleteEx);
const useExpensesGet = ({
  firstDate,
  lastDate,
  category,
  dateSort,
  priceSort,
  skip,
  take,
  key,
}) =>
  useQuery(
    key,
    () =>
      getExs({
        firstDate,
        lastDate,
        category,
        dateSort,
        priceSort,
        skip,
        take,
      }),
    {
      refetchOnWindowFocus: false,
      enabled: false,
      keepPreviousData: true,
    }
  );

const useExpensePost = () => useMutation('postExpense', postEx);
export { useExpensesGet, useExpenseDelete, useExpensePost };
