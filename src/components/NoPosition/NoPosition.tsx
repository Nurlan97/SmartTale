import { Link } from 'react-router-dom';

import styles from './noPositions.module.scss';

const NoPosition = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerBlock}>
        <div className={styles.smile}>{'🙂'}</div>
        <div className={styles.title}>{'Тут еще нет должностей'}</div>
        <div className={styles.subtitle}>{'Создайте новые должности'}</div>
        <Link to='/positions/create' className={styles.button}>
          Создать
        </Link>
      </div>
    </div>
  );
};

export default NoPosition;
