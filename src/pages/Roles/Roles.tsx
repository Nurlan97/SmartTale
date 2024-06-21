import { observer } from 'mobx-react-lite';
import { useLayoutEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../../components/Header/Header';
import NoPosition from '../../components/NoPosition/NoPosition';
import PositionsList from '../../components/PositionsList/PositionsList';
import { userStore } from '../../store';
import rolesStore from '../../store/rolesStore';
import Button from '../../UI/Button/Button';
import styles from './roles.module.scss';

const Roles = observer(() => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    rolesStore.getPositions();
  }, []);
  return (
    <div className={styles.page}>
      <div>
        <Header
          title='Должности'
          path={userStore.organization?.name ? userStore.organization.name : 'SmartTale'}
        />
        {rolesStore.positions.length === 0 ? (
          <NoPosition />
        ) : (
          <PositionsList positions={rolesStore.positions} />
        )}
      </div>

      <div className={styles.footer}>
        <div className={styles.horizontalLine}></div>

        <Button
          color={'blue'}
          type={'button'}
          handler={() => {
            navigate('/positions/create');
          }}
        >
          {'Добавить'}
        </Button>
      </div>
    </div>
  );
});

export default Roles;
