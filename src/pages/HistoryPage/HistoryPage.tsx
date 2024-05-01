import React from 'react'
import styles from "./historyPage.module.scss";
import Header from '../../components/Header/Header';

const HistoryPage = () => {
  return (
    <div className={styles.page}>
        <Header path='Заказы/Текущие заказы' title='История' />
    </div>
  )
}

export default HistoryPage