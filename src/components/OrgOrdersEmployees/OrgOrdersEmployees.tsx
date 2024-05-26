import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import { appStore } from '../../store';
import Button from '../../UI/Button/Button';
import AdRow from '../AdRow/AdRow';
import TableCustom from '../TableCustom/TableCustom';
import styles from './OrgOrdersEmployees.module.scss';
import { OrderSummary } from '../../api/data-contracts';

const OrgOrdersEmployees = observer(() => {
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
    orderList: (prop: OrderSummary[]) =>
      prop.map((item) => <div key={item.orderId}>{item.title}</div>),
  };
  const buttons: { type: 'orders' | 'employees'; title: string }[] = [
    {
      type: 'orders',
      title: 'Текущие заказы организации',
    },
    {
      type: 'employees',
      title: 'Список сотрудников',
    },
  ];
  const addButton = (btn: { type: 'orders' | 'employees'; title: string }) => (
    <Button
      color={btn.type === appStore.myOrganization.group ? 'orange' : 'white'}
      type={'button'}
      height='40px'
      handler={() => {
        appStore.myOrganizationSetGroup(btn.type);
        // setEmployeesActive(btn.type === 'employees');
      }}
    >
      {btn.title}
    </Button>
  );
  useEffect(() => {
    appStore.getMyOrganizationOrders();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logoHeader}>
        <div className={styles.logo}>ST</div>
        <h1 className={styles.title}>SmartTale</h1>
        <div className={styles.description}>
          Мониторинг и управление швейным производством
        </div>
      </div>
      <div className={styles.btnGroup}>
        <div className={styles.btnList}>
          {buttons.map((btn, index) => (
            <div key={index}>{addButton(btn)}</div>
          ))}
        </div>
        {!appStore.isActiveOrders && (
          <Button color='blue' type='button'>
            Пригласить сотрудника
          </Button>
        )}
      </div>
      <div className={styles.list}>
        {appStore.isActiveOrders &&
          appStore.myOrganization.orders.content &&
          appStore.myOrganization.orders.content.map((item, index) => (
            <AdRow key={index} item={item}>
              {item.price}
            </AdRow>
          ))}
        {!appStore.isActiveOrders && (
          // <table className={styles.table}>
          //   <thead className={styles.tableHeaderContainer}>
          //     <th className={styles.tableHeader}>ФИО</th>
          //     <th className={styles.tableHeader}>Почта</th>
          //     <th className={styles.tableHeader}>Заказы</th>
          //     <th className={styles.tableHeader}>Должность</th>
          //     <th className={styles.tableHeader}>Статус</th>
          //   </thead>
          //   <tbody>
          //     {appStore.myOrganization.employees.content &&
          //       appStore.myOrganization.employees.content.map((item, index) => (
          //         <tr key={index} className={styles.tableRow}>
          //           <td className={styles.fullName}>{item.name}</td>
          //           <td className={styles.email}>{item.email}</td>
          //           <td className={styles.order}>
          //             {item.orderList.map((item, index) => (
          //               <div key={index}>{item.title}</div>
          //             ))}
          //           </td>
          //           <td className={styles.position}>{item.position}</td>
          //           <td className={styles.status}>{item.status}</td>
          //         </tr>
          //       ))}
          //   </tbody>
          // </table>
          <TableCustom
            headers={headers}
            rows={appStore.myOrganization.employees.content}
            transform={transform}
          />
        )}
      </div>
    </div>
  );
});

export default OrgOrdersEmployees;
