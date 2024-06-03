import { observer } from 'mobx-react-lite';

import { notifyStore } from '../../store';
import Notify, { INotify } from '../Notify/Notify';
import styles from './notifications.module.scss';

type Props = {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};
const Notifications = observer(({ onMouseEnter, onMouseLeave }: Props) => {
  return (
    <div
      className={styles.wrapper}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.title}>Уведомления</div>
      <div className={styles.line}></div>
      <div className={styles.body}>
        {notifyStore.notifications.length > 0 ? (
          notifyStore.notifications.map((notify, ind) => {
            return <Notify {...notify} key={ind} />;
          })
        ) : (
          <div className={styles.empty}>У вас еще нет уведомлений</div>
        )}
      </div>
      <div className={styles.line}></div>
      <button className={styles.button}>Отметить все прочитанными</button>
    </div>
  );
});

export default Notifications;
