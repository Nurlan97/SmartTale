import { observer } from 'mobx-react-lite';

import { userStore } from '../../store';
import Button from '../../UI/Button/Button';
import styles from './placeOrderDummy.module.scss';

const PlaceOrderDummy = observer(() => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerBlock}>
        <div className={styles.smile}>{userStore.anyAds ? '🙂' : '😃'}</div>
        <div className={styles.title}>
          {userStore.anyAds
            ? 'Хмм...\nУ вас еще нет объявлений'
            : 'У вас есть объявления\nХотите добавить новое?'}
        </div>

        <div className={styles.subtitle}>
          {'Давайте создадим объявление\nи разместим на маркетплейсе'}
        </div>
        {userStore.anyAds ? (
          <Button color='blue' type='button'>
            Создать
          </Button>
        ) : (
          <>
            <Button color='white' type='button'>
              Посмотреть в личном кабинете
            </Button>
            <Button color='blue' type='button'>
              Создать новое
            </Button>
          </>
        )}
      </div>
    </div>
  );
});

export default PlaceOrderDummy;
