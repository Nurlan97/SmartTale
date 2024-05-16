import { observer } from 'mobx-react-lite';

import Header from '../../components/Header/Header';
import PlaceOrderDummy from '../../components/PlaceOrderBlank/PlaceOrderDummy';
import PlaceOrderForm from '../../components/PlaceOrderForm/PlaceOrderForm';
import { createPlaceOrderStore } from '../../store';
import styles from './placeOrderPage.module.scss';

const store = createPlaceOrderStore([]);
export interface IInital {
  title: string;
  description: string;
  price: string;
  contacts: 'EMAIL' | 'PHONE' | 'EMAIL_PHONE';
  sizes: string;
  deadline: Date;
}
const emptyForm: IInital = {
  title: '',
  description: '',
  price: '',
  contacts: 'PHONE',
  sizes: '',
  deadline: new Date(),
};
const PlaceOrderPage = observer(() => {
  return (
    <div className={styles.page}>
      <Header path='Маркетплейс/Разместить заказ' title='Разместить заказ' />
      {store.showForm ? (
        <PlaceOrderForm store={store} initialValues={emptyForm} type='new' />
      ) : (
        <PlaceOrderDummy />
      )}
    </div>
  );
});

export default PlaceOrderPage;
