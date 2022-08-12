import MainContainer from '../components/Containers/MainContainer';
import Searchbar from '../components/homeComponents/Searchbar';
import { Title } from '../components/Titles/Titles';
import CategoryCard from '../components/Cards/CategoryCard';
import ExpenseCard from '../components/Cards/ExpenseCard';
import styles from '../styles/homeComponents/Home.module.scss';
import HomeProfile from '../components/homeComponents/HomeProfile';

import { DateTime } from 'luxon';
import { useExpensesGet } from '../queries/expense';
import { useCategoriesSum } from '../queries/category';
import { useEffect } from 'react';

const Home = () => {
  const { data: expenses, refetch: fetchExpenses } = useExpensesGet({
    key: 'Exs_Latest',
    skip: 0,
    take: 5,
  });

  const { data: CategoriesSum } = useCategoriesSum();
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <MainContainer optionClass={styles.container}>
      <div className={styles.main}>
        {/* SEARCHBAR */}
        <div className={styles.searchbar}>
          <Searchbar />
        </div>

        {/* CATEGORIES */}
        <div className={styles.categories}>
          <Title>Categorías Últimos 30 días</Title>
          <div className={styles.content}>
            {/* SUM */}
            {CategoriesSum &&
              CategoriesSum.data.map((category, index) => {
                return (
                  <CategoryCard
                    key={index}
                    category={category.expenseCategoryId}
                    money={category._sum.money.toFixed(2)}
                  />
                );
              })}
          </div>
        </div>

        {/* EXPENSE */}
        <div className={styles.expenses}>
          <Title>Últimos gastos</Title>
          <div className={styles.content}>
            {/* LATEST EXPENSES */}
            {expenses &&
              expenses.data.map((expense, index) => {
                return (
                  <ExpenseCard
                    key={index}
                    category={expense.category.name}
                    date={DateTime.fromISO(expense.date).toISODate()}
                    money={expense.money.toFixed(2)}
                    description={expense.info}
                    title={expense.title}
                  />
                );
              })}
          </div>
        </div>
      </div>
      <div className={styles.profile}>
        <HomeProfile />
      </div>
    </MainContainer>
  );
};

export default Home;
