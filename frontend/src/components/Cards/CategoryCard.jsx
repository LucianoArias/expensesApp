import styles from '../../styles/Cards/CategoryCard.module.scss';
import { IoGameControllerOutline } from 'react-icons/io5';
import { BsHouseDoor } from 'react-icons/bs';
import { HiOutlineFire } from 'react-icons/hi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { MdOutlinePayment } from 'react-icons/md';
import { GiClothes } from 'react-icons/gi';
import { AiOutlineCar } from 'react-icons/ai';

import { useEffect, useState } from 'react';

const CategoryCard = ({ category, money }) => {
  const [style, setStyle] = useState({});
  const categoryStyle = () => {
    switch (category) {
      default: {
        return {
          ctg: 'Otros gastos',
          icon: <HiOutlineFire style={{ color: '#ffbece' }} />,
          background: '#ff6275',
        };
      }

      case 'Casa':
      case 2: {
        return {
          ctg: 'Casa',
          icon: <BsHouseDoor style={{ color: '#b7dffd' }} />,
          background: '#5a92d6',
        };
      }

      case 'Comida':
      case 1: {
        return {
          ctg: 'Comida',
          icon: <IoFastFoodOutline style={{ color: '#fdeacc' }} />,
          background: '#f8aa35',
        };
      }

      case 'Cuentas y pagos':
      case 3: {
        return {
          ctg: 'Cuentas y pagos',
          icon: <MdOutlinePayment style={{ color: '#D2B4DE ' }} />,
          background: '#9D56FE',
        };
      }

      case 'Diversión':
      case 6: {
        return {
          ctg: 'Diversión',
          icon: <IoGameControllerOutline style={{ color: '#e4f1d5' }} />,
          background: '#92c44c',
        };
      }

      case 'Ropa':
      case 5: {
        return {
          ctg: 'Ropa',
          icon: <GiClothes style={{ color: '#D5DBDB' }} />,
          background: '#717D7E',
        };
      }

      case 'Transporte':
      case 4: {
        return {
          ctg: 'Transporte',
          icon: <AiOutlineCar style={{ color: '#F6C7FF' }} />,
          background: '#E55EFF',
        };
      }
    }
  };

  useEffect(() => {
    setStyle(categoryStyle());
  }, []);

  return (
    <div className={styles.container} style={{ background: style.background }}>
      <div className={styles.inner}>
        <div className={styles.iconContainer}>{style.icon}</div>
        <div className={styles.info}>
          <div className={styles.title}>{style.ctg}</div>
          <div className={styles.money}>{`-$${money}`}</div>
        </div>
      </div>
    </div>
  );
};

CategoryCard.defaultProps = {
  category: 'Other',
  money: '50k',
};

export default CategoryCard;
