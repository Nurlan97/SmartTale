import { observer } from 'mobx-react-lite';
import { useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';

import { OrderAccepted } from '../../api/data-contracts';
import Header from '../../components/Header/Header';
import NoEmployees from '../../components/NoEmployees/NoEmployees';
import TableCustom from '../../components/TableCustom/TableCustom';
import { userStore } from '../../store';
import employeeStore from '../../store/employeeStore';
import styles from './employees.module.scss';

const headers = [
  {
    name: 'name',
    title: 'ФИО',
  },
  {
    name: 'email',
    title: 'Почта',
  },
  {
    name: 'orderList',
    title: 'Заказы',
  },
  {
    name: 'position',
    title: 'Должность',
  },
  {
    name: 'status',
    title: 'Статус',
  },
];
const transform = {
  orderList: (prop: OrderAccepted[]) => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {prop.map((item) => (
        <Link
          key={item.orderId}
          to={`/task/${item.orderId}`}
          style={{ textDecoration: 'underline' }}
        >
          {`${item.key} / ${item.title}`}
        </Link>
      ))}
    </div>
  ),

  name: (prop: string) => (
    <Link
      to={`/employees/${employeeStore.employeeList.content.find((row) => row.name === prop)?.employeeId}`}
      style={{ textDecoration: 'underline' }}
    >
      {prop}
    </Link>
  ),
  status: (prop: string) => {
    const statuses = { Authorized: 'Авторизован', Invited: 'Отправлено приглашение' };
    const key = prop as keyof typeof statuses;
    return statuses[key];
  },
};
const style = {
  status: (prop: string) => {
    const statusStyles = {
      Authorized: {
        color: '#219653',
      },
      Invited: { color: '#828282' },
    };

    if (prop in statusStyles) {
      const key = prop as keyof typeof statusStyles;
      return statusStyles[key];
    }
    return {};
  },
};
const Employees = observer(() => {
  useLayoutEffect(() => {
    employeeStore.getEmployees();
    employeeStore.resetEmployee();
  }, []);
  return (
    <div className={styles.page}>
      <Header
        title='Сотрудники'
        path={userStore.organization?.name ? userStore.organization.name : 'SmartTale'}
      />
      {employeeStore.employeeList.content.length > 0 ? (
        <div>
          <div className={styles.tableHeader}>
            <div>Список сотрудников</div>
            <Link to='/employees/invite' className={styles.button}>
              Пригласить
            </Link>
          </div>
          <TableCustom
            headers={headers}
            rows={employeeStore.employeeList.content}
            transform={transform}
            styling={style}
          />
        </div>
      ) : (
        <NoEmployees />
      )}
    </div>
  );
});

export default Employees;
