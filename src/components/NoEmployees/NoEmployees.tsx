import { Link } from 'react-router-dom';

import Button from '../../UI/Button/Button';
import styles from './noEmployees.module.scss';

const NoEmployees = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerBlock}>
        <div className={styles.smile}>{'🙂'}</div>
        <div className={styles.title}>{'Тут еще нет сотрудников'}</div>
        <div className={styles.subtitle}>
          {'Пригласите своих сотрудников и следите за выполненными задачами'}
        </div>
        <Link to='/employees/invite' className={styles.button}>
          Пригласить
        </Link>
      </div>
    </div>
  );
};

export default NoEmployees;
