import styles from '../../styles/expenseComponents/AddExpenseForm.module.scss';
import { Title } from '../Titles/Titles';

import { useEffect, useState } from 'react';
import { useCategoriesGet } from '../../queries/category';
import { useExpensePost } from '../../queries/expense';
import { DateTime } from 'luxon';
import { queryClient } from '../../constants/config';

const AddExpenseForm = () => {
  const [title, setTitle] = useState('');
  const [money, setMoney] = useState('');
  const [date, setDate] = useState(DateTime.now().toISODate());
  const [info, setInfo] = useState('');
  const [category, setCategory] = useState(10);

  const { data: ctgs } = useCategoriesGet();
  useEffect(() => {
    if (ctgs) setCategory(ctgs?.data[0].id);
    else setCategory(1);
  }, [ctgs]);

  const {
    mutate: postExpense,
    isLoading,
    isError,
    isSuccess,
    error,
  } = useExpensePost();

  let body = {
    title: title,
    money: parseFloat(money),
    date: date,
    info: info,
    expenseCategoryId: parseInt(category),
  };

  return (
    <div className={styles.container}>
      <Title>Añadir Gasto</Title>
      <div className={styles.inner}>
        <input
          type="text"
          placeholder="Titulo"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <input
          type="number"
          placeholder="Precio"
          onChange={(e) => setMoney(e.target.value)}
          value={money}
        />
        <input
          type="date"
          placeholder="Fecha"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
        <input
          type="text"
          placeholder="Info"
          onChange={(e) => setInfo(e.target.value)}
          value={info}
        />

        {/* CATEGORIES */}
        {ctgs ? (
          <select onChange={(e) => setCategory(e.target.value)}>
            {ctgs.data.map((ctg) => {
              return (
                <option key={ctg.id} value={ctg.id}>
                  {ctg.name}
                </option>
              );
            })}
          </select>
        ) : (
          <div>cargando...</div>
        )}

        {/* POST EXPENSE */}
        <button
          onClick={() => {
            postExpense(body, {
              onSuccess: async () => {
                await queryClient.invalidateQueries('Categories_Sum');
              },
            });
          }}
        >
          {isLoading ? 'Cargando...' : 'Añadir Gasto'}
        </button>

        {/* ERROR */}
        <div style={{ marginBottom: '1rem' }}>
          {isError &&
            error.response.data.map((err, index) => {
              return (
                <div style={{ color: 'red' }} key={index}>{`${
                  err.instancePath
                } : ${err.message ? err.message : ''}`}</div>
              );
            })}
          {isSuccess && <div style={{ color: 'green' }}>Gasto añadido</div>}
        </div>
      </div>
    </div>
  );
};

export default AddExpenseForm;
