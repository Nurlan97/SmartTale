import { useEffect } from 'react';

import Grid from '../../components/Grid/Grid';
import Header from '../../components/Header/Header';
import useColumnsGrid from '../../hooks/useColumnsGrid';
import servicesStore from '../../store/servicesStore';
import PageBtnGroup from '../../UI/PageBtnGroup/PageBtnGroup';
import styles from './servicesPage.module.scss';

const ServicesPage = () => {
  const columns = useColumnsGrid(servicesStore.setLimit, 286, 24);
  return (
    <div className={styles.page}>
      <Header path='Маркетплейс/Услуги' title='Услуги' />
      <Grid array={servicesStore.data.content} columns={columns} />
      <PageBtnGroup store={servicesStore} />
    </div>
  );
};

export default ServicesPage;
