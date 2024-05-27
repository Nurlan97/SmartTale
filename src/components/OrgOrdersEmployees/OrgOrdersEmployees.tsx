import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';

import { OrderSummary } from '../../api/data-contracts';
import { appStore, modalStore } from '../../store';
import { Modals } from '../../store/modalStore';
import Button from '../../UI/Button/Button';
import AdRow from '../AdRow/AdRow';
import TableCustom from '../TableCustom/TableCustom';
import styles from './OrgOrdersEmployees.module.scss';

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

  useEffect(() => {
    appStore.getMyOrganizationOrders();
    appStore.getMyOrganization();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.logoHeader}>
        {appStore.myOrganization.logoUrl ? (
          <img
            className={styles.logo}
            src={appStore.myOrganization.logoUrl}
            alt='organization logo'
          />
        ) : (
          <div className={styles.logo}>ST</div>
        )}

        <h1 className={styles.title}>{appStore.myOrganization.name}</h1>
        <div className={styles.description}>{appStore.myOrganization.description}</div>
      </div>
      <div className={styles.btnGroup}>
        <div className={styles.btnList}>
          {buttons.map((btn, index) => (
            <Button
              key={index}
              color={btn.type === appStore.myOrganization.group ? 'orange' : 'white'}
              type='button'
              height='40px'
              handler={() => {
                appStore.myOrganizationSetGroup(btn.type);
              }}
            >
              {btn.title}
            </Button>
          ))}
        </div>
        {!appStore.isActiveOrders && (
          <Button
            color='blue'
            type='button'
            height='40px'
            handler={() => {
              modalStore.openModal(Modals.inviteEmployer);
            }}
          >
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
          <TableCustom
            headers={headers}
            rows={appStore.myOrganization.employees.content}
            transform={transform}
            styling={style}
          />
        )}
      </div>
    </div>
  );
});

export default OrgOrdersEmployees;
