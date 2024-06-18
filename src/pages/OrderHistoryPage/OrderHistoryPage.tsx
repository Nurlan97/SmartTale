import { ru } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';

import DropDownFilterDate from '../../components/DropDownFilterDate/DropDownFilterDate';
import Header from '../../components/Header/Header';
import TableCustom from '../../components/TableCustom/TableCustom';
import orderHistoryStore from '../../store/orderHistoryStore';
import Button from '../../UI/Button/Button';
import DateRangeCustomInput from '../../UI/DateRangeCustomInput/DateRangeCustomInput';
import TabSwitch from '../../UI/TabSwitch/TabSwitch';
import styles from './orderHistoryPage.module.scss';

registerLocale('ru', ru);

const OrderHistoryPage = observer(() => {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    orderHistoryStore.getOrders('active');
  }, []);
  return (
    <div className={styles.page}>
      <Header path='Организация/История заказов' title='История заказов' />
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
        myRef={tableRef}
        headers={orderHistoryStore.table.headers}
        rows={orderHistoryStore.data.content}
        styling={orderHistoryStore.table.style}
        transform={orderHistoryStore.table.transform}
        sorting={orderHistoryStore.table.sorting}
        setSorting={orderHistoryStore.setSorting}
      />
    </div>
  );
});

export default OrderHistoryPage;
