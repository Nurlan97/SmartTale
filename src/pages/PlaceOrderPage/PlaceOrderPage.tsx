import { observer } from 'mobx-react-lite';

import Header from '../../components/Header/Header';
import PlaceOrderDummy from '../../components/PlaceOrderBlank/PlaceOrderDummy';
import PlaceOrderForm from '../../components/PlaceOrderForm/PlaceOrderForm';
import { createPlaceOrderStore } from '../../store';
import styles from './placeOrderPage.module.scss';

const store = createPlaceOrderStore([
  'https://kartinki.pics/pics/uploads/posts/2022-08/thumbs/1661232571_2-kartinkin-net-p-shveinoe-delo-fon-krasivo-2.jpg',
  'https://kartinki.pics/pics/uploads/posts/2022-08/thumbs/1661232571_2-kartinkin-net-p-shveinoe-delo-fon-krasivo-2.jpg',
  'https://kartinki.pics/pics/uploads/posts/2022-08/thumbs/1661232571_2-kartinkin-net-p-shveinoe-delo-fon-krasivo-2.jpg',
]);
const emptyForm = {
  title: '',
  description: '',
  price: '',
  phone: '',
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
