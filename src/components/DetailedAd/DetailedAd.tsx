import { useNavigate } from 'react-router-dom';

import { FullOrder } from '../../api/data-contracts';
import { IType } from '../../store/userStore';
import styles from './detailedAd.module.scss';

interface IProps {
  ad: FullOrder & IType;
}

const DetailedAd = ({ ad }: IProps) => {
  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(-1)}>Назад</button>
      <div className={styles.title}>{`Информация об ${
        ad.type === 'equipment' ? 'оборудовании' : 'заказе'
      }`}</div>
      <div className={styles.field}>
        <div className={styles.label}>Название</div>
        {ad.title}
      </div>
      <div className={styles.field}>
        <div className={styles.label}>Описание</div>
        {ad.description}
      </div>

      {ad.size && (
        <div className={styles.field}>
          <div className={styles.label}>Размеры</div>
          {ad.size}
        </div>
      )}

      <div className={styles.field}>
        <div className={styles.label}>Стоимость в сомах</div>
        {ad.price ? ad.price : 'Стоимость договорная'}
      </div>
      {ad.deadlineAt && (
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
};

export default DetailedAd;
