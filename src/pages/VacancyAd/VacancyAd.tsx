import { observer } from 'mobx-react-lite';
import { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DetailedAd from '../../components/DetailedAd/DetailedAd';
import Header from '../../components/Header/Header';
import { createPlaceAdvStore } from '../../store';
import adStore from '../../store/adStore';
import styles from './vacancyAd.module.scss';
const VacancyAd = observer(() => {
  const { id } = useParams();
  const [store, setStore] = useState<adStore>();
  useLayoutEffect(() => {
    setStore(createPlaceAdvStore(Number(id), 'Job'));
  }, []);
  return (
    <div className={styles.page}>
      <Header path={''} title={'Вакансия'} />
      {store && store.ad && store.ad[0] && <DetailedAd store={store} />}
    </div>
  );
});

export default VacancyAd;
