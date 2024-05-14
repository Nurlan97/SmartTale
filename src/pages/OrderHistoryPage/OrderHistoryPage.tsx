import { ru } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';

import DropDownFilterDate, {
  dateFilters,
} from '../../components/DropDownFilterDate/DropDownFilterDate';
import Header from '../../components/Header/Header';
import TableCustom from '../../components/TableCustom/TableCustom';
import myPurchasesStore from '../../store/myPurchasesStore';
import Button from '../../UI/Button/Button';
import DateRangeCustomInput from '../../UI/DateRangeCustomInput/DateRangeCustomInput';
import styles from './orderHistoryPage.module.scss';

registerLocale('ru', ru);
type TDate = [Date | null, Date | null];
const OrderHistoryPage = observer(() => {
  const tableRef = useRef<HTMLTableElement>(null);
  const [dateRange, setDateRange] = useState<TDate>([null, null]);
  const [startDate, endDate] = dateRange;
  const [filter, setFilter] = useState<dateFilters>(dateFilters.empty);
  return (
    <div className={styles.page}>
      <Header path='Личный кабинет/История заказов' title='История заказов' />
      <div className={styles.filterGroup}>
        <div className={styles.btnGrp}>
          <Button
            color={myPurchasesStore.activeTab === 'active' ? 'orange' : 'white'}
            type='button'
            height='40px'
            handler={myPurchasesStore.setActiveTab('active')}
          >
            Активные
          </Button>
          <Button
            color={myPurchasesStore.activeTab === 'history' ? 'orange' : 'white'}
            type='button'
            height='40px'
            handler={myPurchasesStore.setActiveTab('history')}
          >
            Завершенные
          </Button>
        </div>
        <div className={styles.btnGrp}>
          <DropDownFilterDate
            tableRef={tableRef}
            setDate={setDateRange}
            filter={filter}
            setFilter={setFilter}
          />
          <div>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={(update) => {
                setDateRange(update);
              }}
              customInput={<DateRangeCustomInput />}
              locale='ru'
              // isClearable={true}
            />
          </div>
        </div>
      </div>

      <TableCustom
        myRef={tableRef}
        headers={myPurchasesStore.table.headers}
        rows={myPurchasesStore.data.content}
        styling={myPurchasesStore.table.style}
        transform={myPurchasesStore.table.transform}
        sorting={myPurchasesStore.table.sorting}
        setSorting={myPurchasesStore.setSorting}
      />
    </div>
  );
});

export default OrderHistoryPage;
