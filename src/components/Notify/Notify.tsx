import { IMessageOrg, IMessageUser, Messages } from '../../api/interfaces-ws';
import { NavbarMarket, NavbarOrders, NavbarProfile } from '../../assets';
import { notifyStore } from '../../store';
import styles from './notify.module.scss';

type Props = { notify: IMessageUser | IMessageOrg };
const Notify = ({ notify }: Props) => {
  const notifyObj: {
    text: string;
    defaultLogo: React.VFC<React.SVGProps<SVGSVGElement>>;
    style: string;
    logo: string;
    handlerCode: undefined | string;
  } = {
    text: '',
    defaultLogo: NavbarProfile,
    style: styles.market,
    logo: '',
    handlerCode: undefined,
  };

  function formatDate(date: Date): string {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);

    if (date.toDateString() === now.toDateString()) {
      return `Сегодня в ${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Вчера в ${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
    } else {
      return date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
  }

  switch (notify.data.sub) {
    case Messages.OrderRequest:
      notifyObj.text = `Комания ${notify.data.orgName} отозвалась на ваше объявление ${notify.data.title}`;
      notifyObj.style = styles.orders;
      notifyObj.defaultLogo = NavbarOrders;
      notifyObj.logo = notify.data.logo;
      notifyObj.handlerCode = notify.data.code;
      break;
    case Messages.UserInvite:
      notifyObj.text = `Компания ${notify.data.orgName} приглашает вас к себе на работу`;
      notifyObj.style = styles.profile;
      notifyObj.defaultLogo = NavbarProfile;
      notifyObj.logo = notify.data.logo;
      notifyObj.handlerCode = notify.data.invId;
      break;
    case Messages.OrderConfirm:
      notifyObj.text = `Пользователь ${notify.data.authorName}  подтвердил заказ ${notify.data.key}:${notify.data.title}`;
      notifyObj.style = styles.orders;
      notifyObj.defaultLogo = NavbarOrders;
      notifyObj.logo = notify.data.authorAvatar;
      break;
    case Messages.OrderStatusUpdate:
      notifyObj.text = `Сотрудник ${notify.data.employeeName} обновил заказ ${notify.data.key}:${notify.data.title}`;
      notifyObj.style = styles.orders;
      notifyObj.defaultLogo = NavbarOrders;
      notifyObj.logo = notify.data.employeeAvatar;
      break;
    case Messages.OrderSuspend:
      notifyObj.text = `Вас отстранили от заказа ${notify.data.key}:${notify.data.title}`;
      notifyObj.style = styles.orders;
      notifyObj.defaultLogo = NavbarOrders;
      notifyObj.logo = notify.data.image;
      break;
    case Messages.OrderAppoint:
      notifyObj.text = `Вас назначили на заказ ${notify.data.key}:${notify.data.title} текущий статус ${notify.data.status}`;
      notifyObj.style = styles.orders;
      notifyObj.defaultLogo = NavbarOrders;
      notifyObj.logo = notify.data.image;
      break;
    case Messages.RolesUpdatePersonal:
      notifyObj.text = `Ваша должность изменена: ${notify.data.title}`;
      notifyObj.style = styles.profile;
      notifyObj.defaultLogo = NavbarProfile;
      break;
    case Messages.RolesUpdateOrganization:
      notifyObj.text = `Должность ${notify.data.title} изменена`;
      notifyObj.style = styles.profile;
      notifyObj.defaultLogo = NavbarProfile;
      break;
    case Messages.RolesAppointOrganization:
      notifyObj.text = `Вы назначены на должность ${notify.data.title}`;
      notifyObj.style = styles.profile;
      notifyObj.defaultLogo = NavbarProfile;
      break;
  }
  return (
    <button
      type='button'
      className={styles.wrapper}
      // onClick={() => clickHandler(notify.id)}
    >
      <div className={notify.read ? styles.readed : styles.unreaded}></div>
      <div className={notifyObj.style}>
        {notifyObj.logo ? (
          <img src={notifyObj.logo} alt={notify.data.sub} />
        ) : (
          <notifyObj.defaultLogo />
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.description}>
          <div className={styles.title}>{notify.data.sub}</div>
          <div className={styles.text}>{notifyObj.text}</div>
        </div>
        <div className={styles.date}>{formatDate(new Date(notify.timestamp))}</div>
      </div>
    </button>
  );
};

export default Notify;
