import { useState } from 'react';

import AdminOrderAndEmployeeDashboard from '../../components/AdminOrderAndEmployeeDashboard/AdminOrderAndEmployeeDashboard';
import CreateOrganization from '../../components/CreateOrganization/CreateOrganization';
import EmptyPageMessage from '../../components/EmptyPageMessage/EmptyPageMessage';
import Header from '../../components/Header/Header';
import styles from './AdminOrganizationPage.module.scss';

export interface IInital {
  name: string;
  description: string;
  logo?: string;
}
const emptyForm: IInital = {
  name: '',
  description: '',
  logo: '',
};

const EmptyPageMessageData = {
  smile: '🙂',
  title: 'Тут еще нет организаций',
  subtitle: 'Создайте свою организацию и добавьте своих сотрудников',
  button: 'Создать',
};
const AdminOrganizationPage = () => {
  const [editOrganization, setEditOrganization] = useState(false);
  return (
    <div className={styles.page}>
      <Header path={'SmartTale'} title={'Организация'} />
      {/* <EmptyPageMessage
        smile={EmptyPageMessageData.smile}
        title={EmptyPageMessageData.title}
        subtitle={EmptyPageMessageData.subtitle}
        button={EmptyPageMessageData.button}
        editOrganization={editOrganization}
        setEditOrganization={setEditOrganization}
        initialValues={emptyForm}
        submitBtn={'Создать организацию'}
      /> */}
      <AdminOrderAndEmployeeDashboard
        editOrganization={editOrganization}
        setEditOrganization={setEditOrganization}
      />
    </div>
  );
};

export default AdminOrganizationPage;
