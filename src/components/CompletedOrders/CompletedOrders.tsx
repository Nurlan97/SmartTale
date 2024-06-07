import { ru } from 'date-fns/locale';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import { useNavigate } from 'react-router-dom';

import orderHistoryStore2 from '../../store/orderHistoryStore2';
import Button from '../../UI/Button/Button';
import DateRangeCustomInput from '../../UI/DateRangeCustomInput/DateRangeCustomInput';
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
        <div className={styles.buttonGroup}>
          <Button
            color={orderHistoryStore2.activeTab === 'active' ? 'orange' : 'white'}
            type='button'
            handler={orderHistoryStore2.setActiveTab('active')}
            height='40px'
          >
            Текущие
          </Button>
          <Button
            color={orderHistoryStore2.activeTab === 'history' ? 'orange' : 'white'}
            type='button'
            handler={orderHistoryStore2.setActiveTab('history')}
            height='40px'
          >
            Выполненные
          </Button>
        </div>
        <div className={styles.btnGrp}>
          <DropDownFilterDate
            tableRef={tableRef}
            setDate={orderHistoryStore2.setDateRange}
            filter={orderHistoryStore2.dateFilter.currentType}
            setFilter={orderHistoryStore2.setFilter}
          />
          <div>
            <DatePicker
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
          orderHistoryStore2.data.content.map((item, ind) => (
            <AdRow key={ind} item={item}>
              <button
                className={styles.detailedBtn}
                onClick={async () => {
                  const id = 'productId' in item ? item.productId : item.orderId;
                  navigate(`/my-ads/${id}`);
                }}
              >
                Посмотреть детали
              </button>
            </AdRow>
          ))}
      </div>
    </div>
  );
});

export default CompletedOrders;
