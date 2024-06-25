import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';

import { appStore } from '../../store';
import ScrollableWrapper from '../../UI/ScrollableWrapper/ScrollableWrapper';
import TabSwitch from '../../UI/TabSwitch/TabSwitch';
import AdRow from '../AdRow/AdRow';
import styles from './myAds.module.scss';

const MyAds = observer(() => {
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

      <div className={styles.adsBlock} id='scrollableDiv'>
        <InfiniteScroll
          dataLength={appStore.myAds.data.content.length}
          next={() => appStore.getMyAds(appStore.myAds.data.number + 1)}
          hasMore={appStore.myAds.data.totalPages > appStore.myAds.data.number + 1}
          loader={<h4>Loading...</h4>}
          scrollableTarget='scrollableDiv'
          className={styles.adsWrapper}
        >
          {appStore.myAds.data.content &&
            appStore.myAds.data.content.map((item, ind) => {
              const id = 'productId' in item ? item.productId : item.orderId;
              return (
                <AdRow key={ind} item={item} navigateTo={`/my-ads/${id}`}>
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
                    <div className={styles.detailedBtn}>Посмотреть детали</div>
                  </div>
                </AdRow>
              );
            })}
        </InfiniteScroll>
        {/* {appStore.myAds.data.content &&
            appStore.myAds.data.content.map((item, ind) => {
              const id = 'productId' in item ? item.productId : item.orderId;
              return (
                <AdRow key={ind} item={item} navigateTo={`/my-ads/${id}`}>
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
                    <div className={styles.detailedBtn}>Посмотреть детали</div>
                  </div>
                </AdRow>
              );
            })} */}
      </div>
    </div>
  );
});

export default MyAds;
