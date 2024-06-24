import { observer } from 'mobx-react-lite';

import Header from '../../components/Header/Header';
import OrgOrdersEmployees from '../../components/OrgOrdersEmployees/OrgOrdersEmployees';
import styles from './organizationPage.module.scss';

const OrganizationPage = observer(() => {
  return (
    <div className={styles.page}>
      <Header path='Личный кабинет/Организация' title='Организация' />
      <OrgOrdersEmployees />
    </div>
  );
});

export default OrganizationPage;
