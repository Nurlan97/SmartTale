import { observer } from 'mobx-react-lite';

import Grid from '../../components/Grid/Grid';
import Header from '../../components/Header/Header';
import useColumnsGrid from '../../hooks/useColumnsGrid';
import { appStore } from '../../store';
import PageBtnGroup from '../../UI/PageBtnGroup/PageBtnGroup';
import styles from './myPurchases.module.scss';

const MyPurchases = observer(() => {
  const columns = useColumnsGrid(appStore.setLimitMyBuys, 286, 24);
  return (
    <div className={styles.page}>
      <Header path='Личный кабинет/Мои покупки' title='Мои покупки' />
      <Grid array={appStore.myBuys.data.content} columns={columns} />
      <PageBtnGroup
        store={appStore.myBuys}
        setPage={() => appStore.setMyPurchasesePage}
      />
    </div>
  );
});

export default MyPurchases;
