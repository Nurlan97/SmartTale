import Notify from '../Notify/Notify';
import styles from './notifications.module.scss';
interface INotify {
  type: 'advice' | 'status' | 'accept';
  first: string;
  second: string;
  time: string;
}
type Props = {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};
const Notifications = ({ onMouseEnter, onMouseLeave }: Props) => {
  const notifyArr: INotify[] = [
    { type: 'accept', first: 'Пошив юбок', second: 'Назгул', time: 'Вчера, 10 утра' },
    { type: 'advice', first: 'Пошив юбок', second: 'Назгул', time: 'Вчера, 10 утра' },
    { type: 'status', first: 'Пошив юбок', second: 'Назгул', time: 'Вчера, 10 утра' },
  ];
  return (
    <div
      className={styles.wrapper}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.title}>Уведомления</div>
      <div className={styles.line}></div>
      <div className={styles.body}>
        {notifyArr.map((notify, ind) => {
          return <Notify {...notify} key={ind} />;
        })}
      </div>
      <div className={styles.line}></div>
      <button className={styles.button}>Отметить все прочитанными</button>
    </div>
  );
};

export default Notifications;
