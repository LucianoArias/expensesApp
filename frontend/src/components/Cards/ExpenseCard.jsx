import styles from '../../styles/Cards/ExpenseCard.module.scss';
import { IoGameControllerOutline } from 'react-icons/io5';
import { BsHouseDoor } from 'react-icons/bs';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';
import { HiOutlineFire } from 'react-icons/hi';
import { IoFastFoodOutline } from 'react-icons/io5';
import { MdOutlinePayment } from 'react-icons/md';
import { GiClothes } from 'react-icons/gi';
import { AiOutlineCar } from 'react-icons/ai';

import { useEffect, useState } from 'react';

const CategoryIcon = ({ category }) => {
  const [style, setStyle] = useState({});
  const categoryStyle = () => {
    switch (category) {
      default: {
        return {
          background: '#ffbece',
          icon: <HiOutlineFire />,
          color: '#ff6275',
        };
      }

      case 'Casa': {
        return {
          background: '#b7dffd',
          icon: <BsHouseDoor />,
          color: '#5a92d6',
        };
      }

      case 'Comida': {
        return {
          background: '#fdeacc',
          icon: <IoFastFoodOutline />,
          color: '#f8aa35',
        };
      }

      case 'Cuentas y pagos':
        return {
          background: '#D2B4DE',
          icon: <MdOutlinePayment />,
          color: '#9D56FE',
        };

      case 'Diversión':
        return {
          background: '#e4f1d5',
          icon: <IoGameControllerOutline />,
          color: '#92c44c',
        };

      case 'Otros gastos':
        return {
          background: '#ffbece',
          icon: <HiOutlineFire />,
          color: '#ff6275',
        };

      case 'Ropa':
        return {
          background: '#D5DBDB',
          icon: <GiClothes />,
          color: '#717D7E',
        };

      case 'Transporte':
        return {
          background: '#F6C7FF',
          icon: <AiOutlineCar />,
          color: '#E55EFF',
        };
    }
  };

  useEffect(() => {
    setStyle(categoryStyle());
  }, [category]);
  return (
    <div
      className={styles.iconContainer}
      style={{ background: style.background, color: style.color }}
    >
      {style.icon}
    </div>
  );
};

const ExpenseCard = ({ category, date, money, description, title }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {/* INFO */}
        <div className={styles.info}>
          <CategoryIcon category={category} />
          <div className={styles.categoryContainer}>
            <span className={styles.title}>{title}</span>
            <span className={styles.category}>{category}</span>
            <span className={styles.date}>{date}</span>
            <div
              className={`${visible ? styles.descriptionActive : undefined} ${
                styles.description
              }`}
            >
              <p>{description}</p>
            </div>
          </div>
        </div>

        {/* MONEY */}
        <div className={styles.moneyContainer}>
          <span>{`-$${money}`}</span>
          <div
            className={styles.iconContainer}
            onClick={() => setVisible(!visible)}
            style={description ? {} : { opacity: 0, pointerEvents: 'none' }}
          >
            {visible ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseCard;
