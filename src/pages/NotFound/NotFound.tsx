import { notFound } from '../../assets';
import styles from './notFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
      <img src={notFound} alt='' className={styles.image} />
    </div>
  );
};

export default NotFound;
