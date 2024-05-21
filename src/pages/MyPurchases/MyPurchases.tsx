import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import Grid from '../../components/Grid/Grid';
import Header from '../../components/Header/Header';
import useColumnsGrid from '../../hooks/useColumnsGrid';
import { appStore, equipmentStore, userStore } from '../../store';
import PageBtnGroup from '../../UI/PageBtnGroup/PageBtnGroup';
import styles from './myPurchases.module.scss';

const MyPurchases = observer(() => {
  useEffect(() => {
    appStore.getMyBuys();
  }, []);
  const columns = useColumnsGrid(equipmentStore.setLimit, 286, 24);
  return (
    <div className={styles.page}>
      <Header path='Личный кабинет/Мои покупки' title='Мои покупки' />
      <Grid array={appStore.myBuys.data.content} columns={columns} />
      <PageBtnGroup store={equipmentStore} />
    </div>
  );
});

export default MyPurchases;
