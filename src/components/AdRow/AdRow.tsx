import { useNavigate } from 'react-router-dom';

import { Card, Order, Product } from '../../api/data-contracts';
import { appStore } from '../../store';
import { IType } from '../../store/appStore';
import { cutText } from '../../utils/helpers';
import styles from './adRow.module.scss';
interface IAd {
  item: Order | Product;
}

const AdRow = ({ item }: IAd) => {
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainBlock}>
        <img className={styles.img} src={item.imageUrl} alt='' />
        <div className={styles.descriptionBlock}>
          {'productId' in item ? (
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
          if ('productId' in item) {
            appStore.getDetailedAd(item.productId);
            navigate(`/my-ads/${item.productId}`);
          } else {
            appStore.getDetailedAd(item.orderId);
            navigate(`/my-ads/${item.orderId}`);
          }
        }}
      >
        Посмотреть детали
      </button>
    </div>
  );
};

export default AdRow;
