import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

import DetailedAd from '../../components/DetailedAd/DetailedAd';
import Header from '../../components/Header/Header';
import styles from './detailedPage.module.scss';

const DetailedPage = observer(() => {
  const { id } = useParams();

  return (
    <div className={styles.page}>
      <Header path='Личный кабинет/Мои объявления' title='Детальная информация' />
      <DetailedAd id={Number(id)} />
    </div>
  );
});

export default DetailedPage;
