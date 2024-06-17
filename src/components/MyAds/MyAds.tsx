import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { appStore } from '../../store';
import Button from '../../UI/Button/Button';
import ScrollableWrapper from '../../UI/ScrollableWrapper/ScrollableWrapper';
import TabSwitch from '../../UI/TabSwitch/TabSwitch';
import AdRow from '../AdRow/AdRow';
import styles from './myAds.module.scss';

const MyAds = observer(() => {
  const navigate = useNavigate();
  const buttons: { tab: 'all' | 'orders' | 'products'; title: string }[] = [
    { tab: 'all', title: 'Все объявления' },
    { tab: 'orders', title: 'Заказ' },
    { tab: 'products', title: 'Оборудование' },
  ];
  return (
    <div className={styles.wrapper}>
      <TabSwitch
        tabs={buttons}
        activeTab={appStore.myAds.group}
        switchFunc={(tab: 'all' | 'orders' | 'products') => appStore.myAdsSetGroup(tab)}
      />
      <ScrollableWrapper>
        <div className={styles.adsBlock}>
          {appStore.myAds.data.content &&
            appStore.myAds.data.content.map((item, ind) => (
              <AdRow key={ind} item={item}>
                <div
                  style={{
                    gap: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'end',
                  }}
                >
                  {item.isClosed && (
                    <div className={styles.adHided}>Объявление скрыто</div>
                  )}
                  <button
                    className={styles.detailedBtn}
                    onClick={async () => {
                      const id = 'productId' in item ? item.productId : item.orderId;
                      navigate(`/my-ads/${id}`);
                    }}
                  >
                    Посмотреть детали
                  </button>
                </div>
              </AdRow>
            ))}
        </div>
      </ScrollableWrapper>
    </div>
  );
});

export default MyAds;
