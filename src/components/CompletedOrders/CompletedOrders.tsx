import { ru } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useNavigate } from 'react-router-dom';

import orderHistoryStore2 from '../../store/orderHistoryStore2';
import DateRangeCustomInput from '../../UI/DateRangeCustomInput/DateRangeCustomInput';
import TabSwitch from '../../UI/TabSwitch/TabSwitch';
import { formatDate } from '../../utils/helpers';
import AdRow from '../AdRow/AdRow';
import DropDownFilterDate from '../DropDownFilterDate/DropDownFilterDate';
import styles from './CompletedOrders.module.scss';

registerLocale('ru', ru);

const CompletedOrders: React.FC = observer(() => {
  const tableRef = useRef<HTMLTableElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    orderHistoryStore2.getOrders();
  }, []);

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>История заказов</h3>
      <div className={styles.wrapper}>
        <TabSwitch
          activeTab={orderHistoryStore2.activeTab}
          tabs={[
            { tab: 'active', title: 'Текущие' },
            { tab: 'history', title: 'Выполненные' },
          ]}
          switchFunc={(tab: 'active' | 'history') => orderHistoryStore2.setActiveTab(tab)}
        />
        <div className={styles.filterGrp}>
          <DropDownFilterDate
            tableRef={tableRef}
            setDate={orderHistoryStore2.setDateRange}
            filter={orderHistoryStore2.dateFilter.currentType}
            setFilter={orderHistoryStore2.setFilter}
          />
          <div>
            <DatePicker
              withPortal
              // swapRange={true}
              selectsRange={true}
              startDate={orderHistoryStore2.dateFilter.from}
              endDate={orderHistoryStore2.dateFilter.to}
              onChange={(update) => {
                orderHistoryStore2.setDateRange(update);
              }}
              customInput={<DateRangeCustomInput />}
              locale='ru'
              // isClearable={true}
            />
          </div>
        </div>
      </div>

      <div className={styles.adsBlock} ref={tableRef}>
        {orderHistoryStore2.data.content &&
          orderHistoryStore2.data.content.map((item, ind) => {
            const id = 'productId' in item ? item.productId : item.orderId;
            return (
              <AdRow key={ind} item={item} navigateTo={`/task/${id}`}>
                <div className={styles.details}>
                  {item.completedAt && <p>{formatDate(item.completedAt)}</p>}
                  <div className={styles.detailedBtn}>Посмотреть детали</div>
                </div>
              </AdRow>
            );
          })}
      </div>
    </div>
  );
});

export default CompletedOrders;
