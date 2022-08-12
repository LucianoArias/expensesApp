import styles from '../../styles/Navbar/Navbar.module.scss';

import ListItemLink from './ListItemLink';

import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';

//REACT QUERY
import { useLogoutUser } from '../../queries/user';
import { queryClient } from '../../constants/config';

//HOOKS
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { setAuth, auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const { mutate: logoutHandler, isSuccess } = useLogoutUser();

  useEffect(() => {
    if (isSuccess) {
      queryClient.removeQueries();
      setAuth(false);
      if (!auth) navigate('auth');
    }
  }, [isSuccess]);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <Link to="/">
          <div>Expenses</div>
        </Link>
      </div>

      {/* NAV */}
      <nav>
        <ul>
          {/* HOME */}
          <ListItemLink url="">
            <h3>Inicio</h3>
          </ListItemLink>

          {/* CATEGORIES */}
          <ListItemLink url="categories">
            <h3>Categorías</h3>
          </ListItemLink>

          {/* EXPENSES */}
          <ListItemLink url="expenses">
            <h3>Gastos</h3>
          </ListItemLink>

          {/* Profile */}
          <div className={styles.mobileMenuLinks}>
            <ListItemLink url="profile">
              <h3>Perfil</h3>
            </ListItemLink>
          </div>

          {/* Settings */}
          <div className={styles.mobileMenuLinks}>
            <ListItemLink url="settings">
              <h3>Configuración</h3>
            </ListItemLink>
          </div>
          <ListItemLink url="logout" clickHandler={logoutHandler}>
            <h3>Cerrar sesión</h3>
          </ListItemLink>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
