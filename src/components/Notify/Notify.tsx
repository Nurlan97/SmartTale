import { NavbarMarket, NavbarOrders, NavbarProfile } from '../../assets';
import { notifyStore } from '../../store';
import styles from './notify.module.scss';

export interface INotify {
  id: number;
  type: 'advice' | 'status' | 'accept';
  readed: boolean;
  first: string;
  second: string;
  time: string;
}

const Notify = (notify: INotify) => {
  const notifyObj = {
    advice: {
      title: (first: string, second: string) => {
        return `Объявление № ${first}`;
      },
      description: (first: string, second: string) => {
        return `${second} откликнулся на ваше объявления`;
      },
      icon: <NavbarProfile />,
    },
    status: {
      title: (first: string, second: string) => {
        return 'Ваш статус обновлен';
      },
      description: (first: string, second: string) => {
        return `Статус вашей задачи "${second}"`;
      },
      icon: <NavbarOrders />,
    },
    accept: {
      title: (first: string, second: string) => {
        return `Принят ваш отклик`;
      },
      description: (first: string, second: string) => {
        return `${second} принял ваш отклик в объявлении ${first}`;
      },
      icon: <NavbarMarket />,
    },
  };
  type ObjKey = keyof typeof notifyObj;
  const key = notify.type as ObjKey;
  const clickHandler = (id: number) => {
    notifyStore.markAsRead(id);
  };
  return (
    <button
      type='button'
      className={styles.wrapper}
      onClick={() => clickHandler(notify.id)}
    >
      <div className={notify.readed ? styles.readed : styles.unreaded}></div>
      <div className={styles[notify.type]}>{notifyObj[key].icon}</div>
      <div className={styles.body}>
        <div className={styles.description}>
          <div className={styles.title}>
            {notifyObj[key].title(notify.first, notify.second)}
          </div>
          <div className={styles.text}>
            {notifyObj[key].description(notify.first, notify.second)}
          </div>
        </div>
        <div className={styles.date}>{notify.time}</div>
      </div>
    </button>
  );
};

export default Notify;
