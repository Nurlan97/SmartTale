import { ReactNode } from 'react';

import { Order, OrderSummary, Product } from '../../api/data-contracts';
import { cutText } from '../../utils/helpers';
import styles from './adRow.module.scss';
interface IAd {
  item: Order | Product | OrderSummary;
  children: ReactNode;
}

const AdRow = ({ item, children }: IAd) => {
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
      {children}
    </div>
  );
};

export default AdRow;
