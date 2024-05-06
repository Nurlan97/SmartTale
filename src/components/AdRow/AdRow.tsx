import { useNavigate } from 'react-router-dom';

import { userStore } from '../../store';
import { cutText } from '../../utils/helpers';
import styles from './adRow.module.scss';
interface IAd {
  item: { id: number; title: string; type: string; description: string; image: string };
}

const AdRow = ({ item }: IAd) => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainBlock}>
        <img className={styles.img} src={item.image} alt='' />
        <div className={styles.descriptionBlock}>
          {item.type === 'equipment' ? (
            <div className={styles.equipment}>Оборудование</div>
          ) : (
            <div className={styles.service}>Заказ</div>
          )}
          <div className={styles.title}>{item.title}</div>
          <div className={styles.description}>{cutText(item.description, 90)}</div>
        </div>
      </div>

      <button
        className={styles.detailedBtn}
        onClick={() => {
          userStore.getDetailedAd(item.id);
          navigate(`/my-ads/${item.id}`);
        }}
      >
        Посмотреть детали
      </button>
    </div>
  );
};

export default AdRow;
