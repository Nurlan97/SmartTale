import CompletedOrders from '../../components/CompletedOrders/CompletedOrders';
import Header from '../../components/Header/Header';
import styles from './historyPage.module.scss';

const HistoryPage = () => {
  return (
    <div className={styles.page}>
      <Header path='Организация/История' title='История' />
      <CompletedOrders />
    </div>
  );
};

export default HistoryPage;
