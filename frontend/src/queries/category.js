import { useQuery } from 'react-query';
import Ax from '../utils/Axios';

const getCtgs = async () => {
  return await Ax.get('/categories');
};

const getCtgsSum = async () => {
  return await Ax.get('/categories/sum');
};

const useCategoriesGet = () =>
  useQuery('Categories', getCtgs, {
    staleTime: 50000,
  });

const useCategoriesSum = () =>
  useQuery('Categories_Sum', getCtgsSum, { staleTime: 30000 });

export { useCategoriesGet, useCategoriesSum };
