import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';

import Header from '../../components/Header/Header';
import TableCustom from '../../components/TableCustom/TableCustom';
import orderHistoryStore from '../../store/orderHistoryStore';
import TabSwitch from '../../UI/TabSwitch/TabSwitch';
import styles from './orderHistoryPage.module.scss';

const OrderHistoryPage = observer(() => {
  console.log('render');
  useEffect(() => {
    orderHistoryStore.setActiveTab('active')();
  }, []);
  return (
    <div className={styles.page}>
      <Header path='Личный кабинет/История заказов' title='История заказов' />
      <div className={styles.filterGroup}>
        <TabSwitch
          activeTab={orderHistoryStore.activeTab}
          tabs={[
            { tab: 'active', title: 'Активные' },
            { tab: 'history', title: 'Завершенные' },
          ]}
          switchFunc={(tab) => orderHistoryStore.setActiveTab(tab)}
        />
      </div>

      <TableCustom
        headers={orderHistoryStore.table.headers}
        rows={orderHistoryStore.data.content}
        styling={orderHistoryStore.table.style}
        transform={orderHistoryStore.table.transform}
        sorting={orderHistoryStore.table.sorting}
        setSorting={orderHistoryStore.setSorting}
        currPage={orderHistoryStore.data.number}
        setPage={(page: number) =>
          orderHistoryStore.setActiveTab(orderHistoryStore.activeTab, page)
        }
        totalPages={orderHistoryStore.data.totalPages}
      />
    </div>
  );
});

export default OrderHistoryPage;
