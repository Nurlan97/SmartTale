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
import styles from './orderHistoryPage.module.scss';

registerLocale('ru', ru);

const OrderHistoryPage = observer(() => {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    orderHistoryStore.getOrders('active');
  }, []);
  return (
    <div className={styles.page}>
      <Header path='Личный кабинет/История заказов' title='История заказов' />
      <div className={styles.filterGroup}>
        <div className={styles.btnGrp}>
          <Button
            color={orderHistoryStore.activeTab === 'active' ? 'orange' : 'white'}
            type='button'
            height='40px'
            handler={orderHistoryStore.setActiveTab('active')}
          >
            Активные
          </Button>
          <Button
            color={orderHistoryStore.activeTab === 'history' ? 'orange' : 'white'}
            type='button'
            height='40px'
            handler={orderHistoryStore.setActiveTab('history')}
          >
            Завершенные
          </Button>
        </div>
        {/* <div className={styles.btnGrp}>
          <DropDownFilterDate
            tableRef={tableRef}
            setDate={orderHistoryStore.setDateRange}
            filter={orderHistoryStore.dateFilter.currentType}
            setFilter={orderHistoryStore.setFilter}
          />
          <div>
            <DatePicker
              // swapRange={true}
              selectsRange={true}
              startDate={orderHistoryStore.dateFilter.from}
              endDate={orderHistoryStore.dateFilter.to}
              onChange={(update) => {
                orderHistoryStore.setDateRange(update);
              }}
              customInput={<DateRangeCustomInput />}
              locale='ru'
              // isClearable={true}
            />
          </div>
        </div> */}
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
