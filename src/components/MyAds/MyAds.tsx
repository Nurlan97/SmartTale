import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { appStore } from '../../store';
import Button from '../../UI/Button/Button';
import AdRow from '../AdRow/AdRow';
import styles from './myAds.module.scss';

const MyAds = observer(() => {
  const navigate = useNavigate();
  const buttons: { type: 'all' | 'orders' | 'products'; title: string }[] = [
    { type: 'all', title: 'Все объявления' },
    { type: 'orders', title: 'Заказ' },
    { type: 'products', title: 'Оборудование' },
  ];
  return (
    <div>
      <h3>Тип объявления</h3>
      <div className={styles.btnGroup}>
        {buttons.map((btn, ind) => (
          <Button
            key={ind}
            color={btn.type === appStore.myAds.group ? 'orange' : 'white'}
            type={'button'}
            handler={() => appStore.myAdsSetGroup(btn.type)}
          >
            {btn.title}
          </Button>
        ))}
      </div>
      <div className={styles.adsBlock}>
        {appStore.myAds.data.content &&
          appStore.myAds.data.content.map((item, ind) => (
            <AdRow key={ind} item={item}>
              <button
                className={styles.detailedBtn}
                onClick={async () => {
                  const id = 'productId' in item ? item.productId : item.orderId;
                  navigate(`/my-ads/${id}`);
                }}
              >
                Посмотреть детали
              </button>
            </AdRow>
          ))}
      </div>
    </div>
  );
});

export default MyAds;
