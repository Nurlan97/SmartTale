import { observer } from 'mobx-react-lite';
import { useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';

import EditRole from '../../components/EditRole/EditRole';
import Header from '../../components/Header/Header';
import { userStore } from '../../store';
import rolesStore from '../../store/rolesStore';
import styles from './updatePosition.module.scss';

const UpdatePosition = observer(() => {
  const { id } = useParams();
  useLayoutEffect(() => {
    rolesStore.getPosition(Number(id));
  }, []);
  return (
    <div className={styles.page}>
      <Header
        title='Должности'
        path={userStore.organization?.name ? userStore.organization.name : 'SmartTale'}
      />
      {rolesStore.position && <EditRole position={rolesStore.position} />}
    </div>
  );
});

export default UpdatePosition;
