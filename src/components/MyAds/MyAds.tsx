import { observer } from 'mobx-react-lite';

import { userStore } from '../../store';
import Button from '../../UI/Button/Button';
import AdRow from '../AdRow/AdRow';
import styles from './myAds.module.scss';

const MyAds = observer(() => {
  const buttons: { type: 'all' | 'service' | 'equipment'; title: string }[] = [
    { type: 'all', title: 'Все объявления' },
    { type: 'service', title: 'Заказ' },
    { type: 'equipment', title: 'Оборудование' },
  ];
  const addButton = (btn: { type: 'all' | 'service' | 'equipment'; title: string }) => (
    <Button
      color={btn.type === userStore.myAds.group ? 'orange' : 'white'}
      type={'button'}
      handler={() => userStore.myAdsSetGroup(btn.type)}
    >
      {btn.title}
    </Button>
  );
  return (
    <div>
      <h3>Тип объявления</h3>
      <div className={styles.btnGroup}>{buttons.map((btn) => addButton(btn))}</div>
      <div className={styles.adsBlock}>
        {userStore.myAds.data.map((item) => (
          <AdRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
});

export default MyAds;
