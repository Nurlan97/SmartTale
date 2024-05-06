import { observer } from 'mobx-react-lite';

import Header from '../../components/Header/Header';
import MyAds from '../../components/MyAds/MyAds';
import styles from './myAdsPage.module.scss';

const MyAdsPage = observer(() => {
  return (
    <div className={styles.page}>
      <Header path='Личный кабинет/Мои объявления' title='Мои объявления' />
      <MyAds />
    </div>
  );
});

export default MyAdsPage;
