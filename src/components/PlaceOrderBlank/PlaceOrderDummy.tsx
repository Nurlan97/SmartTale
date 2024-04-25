import { observer } from 'mobx-react-lite';

import placeOrderStore from '../../store/placeOrderStore';
import Button from '../../UI/Button/Button';
import styles from './placeOrderDummy.module.scss';
const PlaceOrderDummy = observer(() => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.innerBlock}>
        <div className={styles.smile}>{placeOrderStore.firstAd ? '🙂' : '😃'}</div>
        <div className={styles.title}>
          {placeOrderStore.firstAd
            ? 'Хмм...\nУ вас еще нет объявлений'
            : 'У вас есть объявления\nХотите добавить новое?'}
        </div>

        <div className={styles.subtitle}>
          {'Давайте создадим объявление\nи разместим на маркетплейсе'}
        </div>
        {placeOrderStore.firstAd ? (
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
