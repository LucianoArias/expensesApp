import styles from '../styles/settingsComponents/Settings.module.scss';

import { Title } from '../components/Titles/Titles';
import MainContainer from '../components/Containers/MainContainer';

import { useUserUpdatePassword } from '../queries/user';
import { useState } from 'react';
import { queryClient } from '../constants/config';

const Settings = () => {
  const {
    mutate: UpdatePassword,
    isError,
    error,
    isLoading,
  } = useUserUpdatePassword();

  const [oldPw, setOldPw] = useState('');
  const [newPw, setNewPw] = useState('');

  let body = {
    oldPassword: oldPw,
    password: newPw,
  };

  return (
    <MainContainer>
      <Title>Configuración</Title>
      <form action="submit" onSubmit={(e) => e.preventDefault()}>
        <div className={styles.container}>
          {/* OLD PW */}
          <div className={styles.password}>
            <label htmlFor="oldPassword">Contraseña actual : </label>
            <input
              type="password"
              name="oldPassword"
              value={oldPw}
              autoComplete="current-password"
              onChange={(e) => setOldPw(e.target.value)}
            />
          </div>
          <div className={styles.password}>
            {/* NEW PW */}
            <label htmlFor="newPassword">Nueva contraseña : </label>
            <input
              type="password"
              name="newPassword"
              autoComplete="new-password"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
            />
          </div>
          <button
            onClick={() =>
              UpdatePassword(body, {
                onSuccess: () => {
                  queryClient.invalidateQueries('user');
                  queryClient.removeQueries();
                },
              })
            }
          >
            {isLoading ? 'Cargando' : 'Cambiar contraseña'}
          </button>
        </div>
        {isError && (
          <div style={{ marginTop: '1rem', color: 'red' }}>
            {error.response.data}
          </div>
        )}
      </form>
    </MainContainer>
  );
};

export default Settings;
