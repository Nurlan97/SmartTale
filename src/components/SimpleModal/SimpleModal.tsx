import { modalStore } from '../../store';
import Button from '../../UI/Button/Button';
import styles from './simpleModal.module.scss';

const SimpleModal = () => {
  const modalObj = {
    closeOrder: {
      emoji: '🎉',
      title: 'Заказ №234\nзавершен!',
      description: 'Заказ теперь неактивный и имеет статус “выполнен” у всех сотрудников',
      button: 'Понятно',
    },
    errorOrder: {
      emoji: '😔',
      title: 'Ой, \nВы опоздали...',
      description: 'Заказ был принят другим пользователем',
      button: 'Посмотреть другие заказы',
    },
    errorValidation: {
      emoji: '🤔',
      title: 'Заполните обязательные поля',
      description: 'Они отмечены красной звездочкой',
      button: 'Заполнить',
    },
    successChanges: {
      emoji: '🎉',
      title: 'Изменения\nсохранены!',
      description: 'Вы обновили права доступа для данной организации',
      button: 'Понятно',
    },
    successOrder: {
      emoji: '🥳',
      title: 'Поздравляем! \n Вы приняли заказ!',
      description: 'Ваш заказ отображается в вашем личном кабинете',
      button: 'Посмотреть',
    },
    successPurchase: {
      emoji: '🥳',
      title: 'Поздравляем!\nВы купили оборудование!',
      description: 'Подробная информация отправлена вам на почту',
      button: 'Посмотреть',
    },
    successSubscribe: {
      emoji: '🥳',
      title: 'Ура!\nПодписка уже в пути!',
      description: 'С вами свяжется наш администратор',
      button: 'Понятно',
    },
  };

  return (
    modalStore.currentSimple && (
      <div className={styles.wrapper}>
        <div className={styles.emoji}>{modalObj[modalStore.currentSimple].emoji}</div>
        <div className={styles.title}>{modalObj[modalStore.currentSimple].title}</div>
        <div className={styles.description}>
          {modalObj[modalStore.currentSimple].description}
        </div>
        <Button color='blue' type='button' handler={modalStore.closeModal}>
          {modalObj[modalStore.currentSimple].button}
        </Button>
      </div>
    )
  );
};

export default SimpleModal;
