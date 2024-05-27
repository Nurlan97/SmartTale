import { modalStore } from '../../store';
import { Modals } from '../../store/modalStore';
import Button from '../../UI/Button/Button';
import styles from './simpleModal.module.scss';

const SimpleModal = () => {
  const map = new Map();

  map.set(Modals.closeOrder, {
    emoji: '🎉',
    title: 'Заказ №234\nзавершен!',
    description: 'Заказ теперь неактивный и имеет статус “выполнен” у всех сотрудников',
    button: 'Понятно',
    handler: () => {},
  });
  map.set(Modals.errorOrder, {
    emoji: '😔',
    title: 'Ой, \nВы опоздали...',
    description: 'Заказ был принят другим пользователем',
    button: 'Посмотреть другие заказы',
    handler: () => {},
  });
  map.set(Modals.errorValidation, {
    emoji: '🤔',
    title: 'Заполните обязательные поля',
    description: 'Они отмечены красной звездочкой',
    button: 'Заполнить',
    handler: () => {},
  });
  map.set(Modals.successChanges, {
    emoji: '🎉',
    title: 'Изменения\nсохранены!',
    description: 'Вы обновили права доступа для данной организации',
    button: 'Понятно',
    handler: () => {},
  });
  map.set(Modals.successOrder, {
    emoji: '🥳',
    title: 'Поздравляем! \n Вы приняли заказ!',
    description: 'Ваш заказ отображается в вашем личном кабинете',
    button: 'Посмотреть',
    handler: () => {},
  });
  map.set(Modals.successPurchase, {
    emoji: '🥳',
    title: 'Поздравляем!\nВы купили оборудование!',
    description: 'Подробная информация отправлена вам на почту',
    button: 'Посмотреть',
    handler: () => {},
  });
  map.set(Modals.successSubscribe, {
    emoji: '🥳',
    title: 'Ура!\nПодписка уже в пути!',
    description: 'С вами свяжется наш администратор',
    button: 'Понятно',
    handler: () => {},
  });

  return (
    modalStore.currentModal && (
      <div className={styles.wrapper}>
        <div className={styles.emoji}>{map.get(modalStore.currentModal).emoji}</div>
        <div className={styles.title}>{map.get(modalStore.currentModal).title}</div>
        <div className={styles.description}>
          {map.get(modalStore.currentModal).description}
        </div>
        <Button color='blue' type='button' handler={modalStore.closeModal}>
          {map.get(modalStore.currentModal).button}
        </Button>
      </div>
    )
  );
};

export default SimpleModal;
