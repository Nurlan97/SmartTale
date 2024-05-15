import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { appStore } from '../../store';
import Button from '../../UI/Button/Button';
import AdRow from '../AdRow/AdRow';
import styles from './myAds.module.scss';

const MyAds = observer(() => {
  const navigate = useNavigate();
  const buttons: { type: 'all' | 'service' | 'equipment'; title: string }[] = [
    { type: 'all', title: 'Все объявления' },
    { type: 'service', title: 'Заказ' },
    { type: 'equipment', title: 'Оборудование' },
  ];
  const addButton = (btn: { type: 'all' | 'service' | 'equipment'; title: string }) => (
    <Button
      color={btn.type === appStore.myAds.group ? 'orange' : 'white'}
      type={'button'}
      handler={() => appStore.myAdsSetGroup(btn.type)}
    >
      {btn.title}
    </Button>
  );
  return (
    <div>
      <h3>Тип объявления</h3>
      <div className={styles.btnGroup}>{buttons.map((btn) => addButton(btn))}</div>
      <div className={styles.adsBlock}>
        {appStore.myAds.data.content &&
          appStore.myAds.data.content.map((item, ind) => (
            <AdRow key={ind} item={item}>
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
            </AdRow>
          ))}
      </div>
    </div>
  );
});

export default MyAds;
