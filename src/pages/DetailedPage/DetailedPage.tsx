import { observer } from 'mobx-react-lite';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import DetailedAd from '../../components/DetailedAd/DetailedAd';
import Header from '../../components/Header/Header';
import { createPlaceAdvStore } from '../../store';
import adStore from '../../store/adStore';
import styles from './detailedPage.module.scss';

const DetailedPage = observer(() => {
  const { id } = useParams();
  const [store, setStore] = useState<adStore>();
  useLayoutEffect(() => {
    setStore(createPlaceAdvStore(Number(id)));
  }, []);
  return (
    <div className={styles.page}>
      <Header path='Личный кабинет/Мои объявления' title='Детальная информация' />
      {store && store.ad && store.ad[0] && <DetailedAd store={store} />}
    </div>
  );
});

export default DetailedPage;
