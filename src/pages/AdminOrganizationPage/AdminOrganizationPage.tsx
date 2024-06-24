import { useState } from 'react';

import AdminOrderAndEmployeeDashboard from '../../components/AdminOrderAndEmployeeDashboard/AdminOrderAndEmployeeDashboard';
import EmptyPageMessage from '../../components/EmptyPageMessage/EmptyPageMessage';
import Header from '../../components/Header/Header';
import { userStore } from '../../store';
import styles from './AdminOrganizationPage.module.scss';

const AdminOrganizationPage = () => {
  const [editOrganization, setEditOrganization] = useState(false);
  return (
    <div className={styles.page}>
      <Header path={'SmartTale'} title={'Организация'} />
      {userStore.orgId ? (
        <AdminOrderAndEmployeeDashboard
          editOrganization={editOrganization}
          setEditOrganization={setEditOrganization}
        />
      ) : (
        <EmptyPageMessage
          editOrganization={editOrganization}
          setEditOrganization={setEditOrganization}
        />
      )}
    </div>
  );
};

export default AdminOrganizationPage;
