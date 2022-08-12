import styles from '../../styles/homeComponents/HomeProfile.module.scss';
import { BsPerson, BsPencil, BsWallet2 } from 'react-icons/bs';
import { IoSettingsOutline } from 'react-icons/io5';

import { Link } from 'react-router-dom';

import { useUser } from '../../queries/user';

const HomeProfile = () => {
  const { data } = useUser();
  return (
    <div className={styles.container}>
      <div className={styles.iconContainer}>
        <BsPerson />
      </div>
      <div className={styles.info}>
        <span className={styles.welcome}>
          {data && `Hola ${data?.data.firstName}!`}
        </span>
        <div className={styles.options}>
          <Link to="profile">
            <span>Perfil</span>
            <BsPencil />
          </Link>
          <Link to="settings">
            <span>Configuración</span>
            <IoSettingsOutline />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeProfile;
