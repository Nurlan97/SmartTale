import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import Grid from '../../components/Grid/Grid';
import Header from '../../components/Header/Header';
import useColumnsGrid from '../../hooks/useColumnsGrid';
import equipmentStore from '../../store/equipmentStore';
import PageBtnGroup from '../../UI/PageBtnGroup/PageBtnGroup';
import styles from './equipmentPage.module.scss';

const EquipmentPage = observer(() => {
  const columns = useColumnsGrid(equipmentStore.setLimit, 286, 24);
  return (
    <div className={styles.page}>
      <Header path='Маркетплейс/Оборудование' title='Оборудование' />
      <Grid array={equipmentStore.data.content} columns={columns} />
      <PageBtnGroup store={equipmentStore} setPage={equipmentStore.setPage} />
    </div>
  );
});

export default EquipmentPage;
