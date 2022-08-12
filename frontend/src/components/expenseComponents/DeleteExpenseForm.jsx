import { Title } from '../Titles/Titles';
import ExpenseCard from '../Cards/ExpenseCard';

import { BsTrash } from 'react-icons/bs';
import styles from '../../styles/expenseComponents/DeleteExpenseForm.module.scss';

import { useState } from 'react';
import { DateTime } from 'luxon';
import { useExpenseDelete, useExpensesGet } from '../../queries/expense';
import { queryClient } from '../../constants/config';

const DeleteExpenseForm = () => {
  const [firstDate, setFirstDate] = useState(
    DateTime.now()
      .minus({
        day: 1,
      })
      .toISODate()
  );
  const [lastDate, setLastDate] = useState(
    DateTime.now()
      .plus({
        day: 1,
      })
      .toISODate()
  );
  const { mutate: deleteEx } = useExpenseDelete();
  const {
    data,
    refetch: fetchExpenses,
    isLoading: expensesLoading,
  } = useExpensesGet({
    firstDate: firstDate,
    lastDate: lastDate,
    key: 'Exs',
  });

  return (
    <div className={styles.container}>
      <Title>Borrar Gasto</Title>
      <div className={styles.dateSearchFilter}>
        {/* FIRST DATE */}
        <div className={styles.date}>
          <label htmlFor="firstDate">Desde :</label>
          <input
            type="date"
            name="firstDate"
            value={firstDate}
            onChange={(e) => setFirstDate(e.target.value)}
          />
        </div>
        {/* LAST DATE */}
        <div className={styles.date}>
          <label htmlFor="lastDate">Hasta :</label>
          <input
            type="date"
            name="lastDate"
            value={lastDate}
            onChange={(e) => setLastDate(e.target.value)}
          />
        </div>
        {/* ACTION BUTTON */}
        <button className={styles.btn} onClick={() => fetchExpenses()}>
          Mostrar Gastos
        </button>
      </div>

      {/* RESULTS */}
      <div className={styles.results}>
        {data &&
          data?.data.map((ex, index) => {
            return (
              <div key={index} className={styles.container}>
                <div className={styles.deleteContainer}>
                  <ExpenseCard
                    category={ex.category.name}
                    money={ex.money}
                    description={`id : ${ex.id}title: ${ex.title} ${ex.info}`}
                    date={DateTime.fromISO(ex.date).toISODate()}
                    title={ex.title}
                  />
                  <div
                    className={styles.iconContainer}
                    style={
                      expensesLoading
                        ? {
                            pointerEvents: 'none',
                            background: '#333',
                          }
                        : {}
                    }
                    onClick={() => {
                      deleteEx(ex.id, {
                        onSuccess: async () => {
                          await queryClient
                            .invalidateQueries('Exs')
                            .then(await fetchExpenses())
                            .catch();
                        },
                      });
                    }}
                  >
                    <BsTrash />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default DeleteExpenseForm;
