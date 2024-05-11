import React from 'react'
import styles from "./historyPage.module.scss";
import Header from '../../components/Header/Header';
import CompletedOrders from '../../components/CompletedOrders/CompletedOrders';

const HistoryPage = () => {
  return (
    <div className={styles.page}>
        <Header path='Заказы/Текущие заказы' title='История' />
        <CompletedOrders/>
    </div>
  )
}

export default HistoryPage