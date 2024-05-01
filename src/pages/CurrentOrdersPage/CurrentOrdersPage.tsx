import Header from '../../components/Header/Header'
import styles from "./currentOrdersPage.module.scss";
import { DragAndDrop } from '../../components/DragAndDrop/DragAndDrop';


const CurrentOrdersPage = () => {
  return (
    <div className={styles.page}>
        <Header path='Заказы/Текущие заказы' title='Текущие заказы' />
        <DragAndDrop/>
    </div>
  )
}

export default CurrentOrdersPage