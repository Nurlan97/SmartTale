import { DragAndDrop } from '../../components/DragAndDrop/DragAndDrop';
import Header from '../../components/Header/Header';
import styles from './currentOrdersPage.module.scss';

const CurrentOrdersPage = () => {
  return (
    <div className={styles.page}>
      <Header path='Заказы/Текущие заказы' title='Текущие заказы' />
      <DragAndDrop />
    </div>
  );
};

export default CurrentOrdersPage;
