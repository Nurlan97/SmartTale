import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import vacancyStore from '../../store/vacancyStore';
import AdRow from '../AdRow/AdRow';
import styles from './vacancyList.module.scss';
const VacancyList = observer(() => {
  const navigate = useNavigate();
  return (
    <div className={styles.list}>
      {vacancyStore.positionsList?.content.map((item, ind) => {
        const id =
          'productId' in item
            ? item.productId
            : 'orderId' in item
              ? item.orderId
              : item.jobId;
        return (
          <AdRow key={ind} item={item} navigateTo={`/vacancy/${id}`}>
            <div
              style={{
                gap: '12px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'end',
              }}
            >
              {item.isClosed && <div className={styles.adHided}>Объявление скрыто</div>}
              <div className={styles.detailedBtn}>Посмотреть детали</div>
            </div>
          </AdRow>
        );
      })}
    </div>
  );
});

export default VacancyList;
