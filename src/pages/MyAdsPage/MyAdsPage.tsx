import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import Header from '../../components/Header/Header';
import MyAds from '../../components/MyAds/MyAds';
import { appStore } from '../../store';
import styles from './myAdsPage.module.scss';

const MyAdsPage = observer(() => {
  useEffect(() => {
    appStore.getMyAds();
  }, []);
  return (
    <div className={styles.page}>
      <Header path='Личный кабинет/Мои объявления' title='Мои объявления' />
      <MyAds />
    </div>
  );
});

export default MyAdsPage;
