import { observer } from 'mobx-react-lite';
import InfiniteScroll from 'react-infinite-scroll-component';

import { notifyStore } from '../../store';
import Notify from '../Notify/Notify';
import styles from './notifications.module.scss';

type Props = {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
};
const Notifications = observer(({ onMouseEnter, onMouseLeave }: Props) => {
  console.log(notifyStore.isLoading, notifyStore.hasNext);
  const loadMoreNotifications = async () => {
    try {
      notifyStore.getHistory();
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className={styles.title}>Уведомления</div>
      <div className={styles.line}></div>

      <div className={styles.body} id='scrollableDiv'>
        <InfiniteScroll
          dataLength={notifyStore.notifications.length}
          next={loadMoreNotifications}
          hasMore={notifyStore.hasNext}
          loader={<h4 className={styles.empty}>Loading...</h4>}
          scrollableTarget='scrollableDiv'
        >
          {notifyStore.notifications.length > 0 ? (
            <>
              {notifyStore.notifications.map((notify, ind) => {
                return <Notify notify={notify} key={ind} />;
              })}
            </>
          ) : (
            <div className={styles.empty}>У вас еще нет уведомлений</div>
          )}
        </InfiniteScroll>
      </div>

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
