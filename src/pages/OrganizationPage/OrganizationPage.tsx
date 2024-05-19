import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import Header from '../../components/Header/Header';
import OrgOrdersEmployees from '../../components/OrgOrdersEmployees/OrgOrdersEmployees';
import { appStore } from '../../store';
import styles from './organizationPage.module.scss';

const OrganizationPage = observer(() => {
  useEffect(() => {
    appStore.getMyOrders();
  }, []);
  return (
    <div className={styles.page}>
      <Header path='Личный кабинет/Организация' title='Организация' />
      <OrgOrdersEmployees />
    </div>
  );
});

export default OrganizationPage;
