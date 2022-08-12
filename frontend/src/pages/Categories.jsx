import styles from '../styles/CategoriesComponents/Categories.module.scss';
import { Title } from '../components/Titles/Titles';
import ExpenseCard from '../components/Cards/ExpenseCard';
import MainContainer from '../components/Containers/MainContainer';

import { DateTime } from 'luxon';
import { useState, useEffect } from 'react';
import { useCategoriesGet } from '../queries/category';
import { useExpensesGet } from '../queries/expense';

const Categories = () => {
  const [timeSpan, setTimeSpan] = useState(
    DateTime.now()
      .minus({
        days: 7,
      })
      .toISODate()
  );
  const [categories, setCategories] = useState('');
  const [sortingField, setSortingField] = useState('dateSort');
  const [order, setOrder] = useState('asc');
  const { data: ctgs, isFetched: isCtgsFetched } = useCategoriesGet();
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    if (ctgs) setCategories(ctgs.data[0].id);
  }, [ctgs]);

  const { data: FilteredExpenses, refetch: fetchExpenses } = useExpensesGet({
    firstDate: timeSpan,
    category: categories ? categories : undefined,
    [sortingField]: order,
    skip: skip,
    take: 10,
    key: 'CategoriesExs',
  });

  return (
    <MainContainer>
      <Title>Categorías</Title>

      <div className={styles.container}>
        {/* FITLERS */}
        <div className={styles.filters}>
          <div className={styles.filterContainer}>
            {/* TIME SPAN */}
            <div className={styles.filter}>
              <label htmlFor="timeSpan">Fecha :</label>
              <select
                name="timeSpan"
                onChange={(e) => {
                  setTimeSpan(e.target.value);
                }}
              >
                <option
                  value={DateTime.now()
                    .minus({
                      days: 7,
                    })
                    .toISODate()}
                >
                  Últimos 7 días
                </option>
                <option
                  value={DateTime.now()
                    .minus({
                      days: 28,
                    })
                    .toISODate()}
                >
                  Últimos 28 días
                </option>
                <option
                  value={DateTime.now()
                    .minus({
                      days: 90,
                    })
                    .toISODate()}
                >
                  Últimos 90 días
                </option>
                <option
                  value={DateTime.now()
                    .minus({
                      days: 365,
                    })
                    .toISODate()}
                >
                  Últimos 365 días
                </option>
              </select>
            </div>
          </div>

          {/* CATEGORIES */}
          <div className={styles.filterContainer}>
            <div className={styles.filter}>
              <label htmlFor="categories">Categorías :</label>
              {isCtgsFetched ? (
                <select
                  name="categories"
                  onChange={(e) => {
                    setCategories(e.target.value);
                  }}
                >
                  {ctgs?.data?.map((category, index) => {
                    return (
                      <option key={index} value={category.id}>
                        {category.name}
                      </option>
                    );
                  })}
                  <option value="">Todo</option>
                </select>
              ) : (
                <div>Cargando...</div>
              )}
            </div>
          </div>

          {/* SORTING FIELD */}
          <div className={styles.filterContainer}>
            <div className={styles.filter}>
              <label htmlFor="sortingField">Filtrar por :</label>
              <select
                name="sortingField"
                onChange={(e) => {
                  setSortingField(e.target.value);
                }}
              >
                <option value="date">Fecha</option>
                <option value="price">Precio</option>
              </select>
            </div>
          </div>

          {/* ASC OR DESC */}
          <div className={styles.filterContainer}>
            <div className={styles.filter}>
              <label htmlFor="order">Ordenar :</label>
              <select
                name="order"
                onChange={(e) => {
                  setOrder(e.target.value);
                }}
              >
                <option value="asc">Ascendente</option>
                <option value="desc">Descendente</option>
              </select>
            </div>
          </div>
        </div>

        {/* RESULTS */}
        <div className={styles.results}>
          <button className={styles.btn} onClick={() => fetchExpenses()}>
            Mostrar Resultados
          </button>
          <div className={styles.inner}>
            {FilteredExpenses &&
              FilteredExpenses.data?.map((expense, index) => {
                return (
                  <ExpenseCard
                    key={index}
                    category={expense.category.name}
                    money={expense.money}
                    date={DateTime.fromISO(expense.date).toISODate()}
                    description={expense.info}
                    title={expense.title}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </MainContainer>
  );
};

export default Categories;
