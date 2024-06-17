import { observer } from 'mobx-react-lite';
import { useLayoutEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ArrowLeft, defaultPhoto } from '../../assets';
import Header from '../../components/Header/Header';
import OrganizationTask from '../../components/OrganizationTask/OrganizationTask';
import { userStore } from '../../store';
import employeeStore from '../../store/employeeStore';
import TabSwitch from '../../UI/TabSwitch/TabSwitch';
import styles from './employeeDetails.module.scss';

const EmployeeDetails = observer(() => {
  const { id } = useParams();
  useLayoutEffect(() => {
    employeeStore.getEmployeeDetails(Number(id));
  }, []);

  const buttons: { tab: 'active' | 'all'; title: string }[] = [
    { tab: 'active', title: 'Текущие заказы' },
    { tab: 'all', title: 'Все заказы сотрудника' },
  ];
  return (
    <div className={styles.page}>
      <Header
        path={userStore.organization?.name ? userStore.organization.name : 'SmartTale'}
        title={'Сотрудники'}
      />
      <div className={styles.employee}>
        <Link to={'/employees'} className={styles.backLink}>
          <ArrowLeft className={styles.arrow} />
          {'Детали сотрудника'}
        </Link>
        <div className={styles.employeeDetails}>
          <img
            src={
              employeeStore.employeeDetail?.employee.avatarUrl
                ? employeeStore.employeeDetail?.employee.avatarUrl
                : defaultPhoto
            }
            alt=''
            className={styles.avatar}
          />
          <div className={styles.textDetails}>
            <div className={styles.name}>
              {employeeStore.employeeDetail?.employee.name}
            </div>
            <div className={styles.phone}>
              {employeeStore.employeeDetail?.employee.phoneNumber}
            </div>
            <div className={styles.position}>
              {employeeStore.employeeDetail?.employee.position}
            </div>
          </div>
        </div>
        <TabSwitch
          tabs={buttons}
          activeTab={employeeStore.employeeDetailExt.activeTab}
          switchFunc={(tab: 'all' | 'active') => employeeStore.switchDetailsTab(tab)}
        />
        {employeeStore.employeeDetail?.tasks.content?.map((task) => {
          return <OrganizationTask task={task} key={task.orderId} id={Number(id)} />;
        })}
        {/* <OrganizationTask
          task={{
            orderId: 0,
            status: 'PENDING',
            title: 'Пошив одежды',
            key: 'Е1-111',
            description:
              'Какое-то описани по пошиву одежды с дополнительной информацией для исполнителя',
            price: 10000,
            comment: 'Какой-то комментарий',
            date: '2024-06-17',
            employees: [
              {
                userId: 0,
                name: 'Исполнитель 1',
                avatarUrl: '',
                reward: 0,
              },
              {
                userId: 1,
                name: 'Исполнитель 2',
                avatarUrl: '',
                reward: 0,
              },
              {
                userId: 2,
                name: 'Исполнитель 3',
                avatarUrl: '',
                reward: 0,
              },
            ],
            publisherId: 0,
            publisherName: 'Имя заказчика',
            publisherAvatarUrl: '',
            publisherPhoneNumber: '1267526234',
          }}
          id={Number(id)}
        /> */}
      </div>
    </div>
  );
});

export default EmployeeDetails;
