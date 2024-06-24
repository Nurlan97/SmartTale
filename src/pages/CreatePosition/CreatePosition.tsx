import EditRole from '../../components/EditRole/EditRole';
import Header from '../../components/Header/Header';
import { userStore } from '../../store';
import styles from './createPosition.module.scss';
const CreatePosition = () => {
  return (
    <div className={styles.page}>
      <Header
        title='Должности'
        path={userStore.organization?.name ? userStore.organization.name : 'SmartTale'}
      />
      <EditRole />
    </div>
  );
};

export default CreatePosition;
