import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  JobSummary,
  OrderAccepted,
  OrderSummaryPersonal,
  Product,
  SearchItem,
} from '../../api/data-contracts';
import { defaultImage } from '../../assets';
import { appStore } from '../../store';
import { addImageSize, cutText } from '../../utils/helpers';
import styles from './adRow.module.scss';
interface IAd {
  item: Product | OrderAccepted | SearchItem | OrderSummaryPersonal | JobSummary;
  children?: ReactNode;
}

const AdRow = ({ item, children }: IAd) => {
  const image = 'imageUrl' in item ? item.imageUrl : item.image;
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainBlock}>
        <img
          className={styles.img}
          src={image ? addImageSize(image, 75, 75) : defaultImage}
          alt=''
        />
        <div className={styles.descriptionBlock}>
          {'productId' in item && <div className={styles.equipment}>Оборудование</div>}
          {'orderId' in item && <div className={styles.service}>Заказ</div>}

          <div className={styles.title}>{item.title}</div>
          {'description' in item && item.description && (
            <div className={styles.description}>{cutText(item.description, 90)}</div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default AdRow;
