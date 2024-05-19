import { observer } from 'mobx-react-lite';

import { appStore } from '../../store';
import Button from '../../UI/Button/Button';
import AdRow from '../AdRow/AdRow';
import styles from './OrgOrdersEmployees.module.scss';

const OrgOrdersEmployees = observer(() => {
  const buttons: { type: 'orders' | 'employees'; title: string }[] = [
    {
      type: 'orders',
      title: 'Текущие заказы организации',
    },
    {
      type: 'employees',
      title: 'Список сотрудников',
    },
  ];
  const addButton = (btn: { type: 'orders' | 'employees'; title: string }) => (
    <Button
      color={btn.type === appStore.myOrders.group ? 'orange' : 'white'}
      type={'button'}
      handler={() => appStore.myOrdersSetGroup(btn.type)}
    >
      {btn.title}
    </Button>
  );
  return (
    <div>
      <div className={styles.logoHeader}>
        <div className={styles.logo}>ST</div>
        <h1 className={styles.title}>SmartTale</h1>
        <div className={styles.description}>
          Мониторинг и управление швейным производством
        </div>
      </div>
      <div className={styles.btnGroup}>
        {buttons.map((btn, index) => (
          <div key={index}>{addButton(btn)}</div>
        ))}
      </div>
      <div className={styles.list}>
        {appStore.myOrders.data.content &&
          appStore.myOrders.data.content.map((item, index) => (
            <AdRow key={index} item={item}>
              {item.price}
            </AdRow>
          ))}
      </div>
    </div>
  );
});

export default OrgOrdersEmployees;
