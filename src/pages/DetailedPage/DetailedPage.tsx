import { useParams } from 'react-router-dom';

import DetailedAd from '../../components/DetailedAd/DetailedAd';
import Header from '../../components/Header/Header';
import { appStore } from '../../store';
import styles from './detailedPage.module.scss';

const DetailedPage = () => {
  const { id } = useParams();
  console.log('id', id);
  return (
    <div className={styles.page}>
      <Header path='Личный кабинет/Мои объявления' title='Детальная информация' />
      <DetailedAd ad={appStore.myAds.detailed} />
    </div>
  );
};

export default DetailedPage;
