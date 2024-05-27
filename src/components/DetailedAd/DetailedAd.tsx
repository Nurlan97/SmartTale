import { observer } from 'mobx-react-lite';

import { FullOrder, FullProduct } from '../../api/data-contracts';
import styles from './detailedAd.module.scss';

interface IProps {
  ad: FullOrder | FullProduct;
}

const DetailedAd = observer(({ ad }: IProps) => {
  return (
    <div>
      <div className={styles.title}>{`Информация ${
        'productId' in ad ? 'об оборудовании' : 'о заказе'
      }`}</div>
      <div className={styles.field}>
        <div className={styles.label}>Название</div>
        {ad.title}
      </div>
      <div className={styles.field}>
        <div className={styles.label}>Описание</div>
        {ad.description}
      </div>

      {'size' in ad && (
        <div className={styles.field}>
          <div className={styles.label}>Размеры</div>
          {ad.size}
        </div>
      )}

      <div className={styles.field}>
        <div className={styles.label}>Стоимость в сомах</div>
        {ad.price ? ad.price : 'Стоимость договорная'}
      </div>
      {'deadlineAt' in ad && (
        <div className={styles.field}>
          <div className={styles.label}>Крайняя дата выполнения</div>
          {ad.deadlineAt}
        </div>
      )}

      {ad.imageUrls && (
        <>
          <div className={styles.title}>Галерея фотографий</div>
          <div className={styles.imgContainer}>
            {ad.imageUrls.map((img, ind) => (
              <img key={ind} src={img} alt='' className={styles.img} />
            ))}
          </div>
        </>
      )}
    </div>
  );
});

export default DetailedAd;
