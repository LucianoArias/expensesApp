import { Title } from '../components/Titles/Titles';
import MainContainer from '../components/Containers/MainContainer';
import AddExpenseForm from '../components/expenseComponents/AddExpenseForm';
import DeleteExpenseForm from '../components/expenseComponents/DeleteExpenseForm';
const Expenses = () => {
  return (
    <MainContainer>
      <Title>Gastos</Title>
      <AddExpenseForm />
      <DeleteExpenseForm />
    </MainContainer>
  );
};

export default Expenses;
