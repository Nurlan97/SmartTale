import { useParams } from 'react-router-dom';

import DetailedAd from '../../components/DetailedAd/DetailedAd';
import Header from '../../components/Header/Header';
import { userStore } from '../../store';
import styles from './detailedPage.module.scss';

export const DetailedPage = () => {
  const { id } = useParams();
  console.log('id', id);
  return (
    <div className={styles.page}>
      <Header path='Личный кабинет/Мои объявления' title='Детальная информация' />
      <DetailedAd ad={userStore.myAds.detailed} />
    </div>
  );
};
