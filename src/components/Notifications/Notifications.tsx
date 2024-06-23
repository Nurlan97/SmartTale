import { observer } from 'mobx-react-lite';

import { notifyStore } from '../../store';
import ScrollableWrapper from '../../UI/ScrollableWrapper/ScrollableWrapper';
import Notify from '../Notify/Notify';
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
      <ScrollableWrapper>
        <div className={styles.body}>
          {notifyStore.notifications.length > 0 ? (
            <>
              {notifyStore.notifications.map((notify, ind) => {
                return <Notify notify={notify} key={ind} />;
              })}
            </>
          ) : (
            <div className={styles.empty}>У вас еще нет уведомлений</div>
          )}
        </div>
      </ScrollableWrapper>
      <div className={styles.line}></div>
      {notifyStore.notifications.length > 0 && (
        <div className={styles.footer}>
          {notifyStore.hasUnreaded ? (
            <button
              className={styles.button}
              onClick={() => {
                notifyStore.markAllReaded();
              }}
            >
              Отметить все прочитанными
            </button>
          ) : (
            <div>У вас нет непрочитанных уведомлений</div>
          )}
        </div>
      )}
    </div>
  );
});

export default Notifications;
