import { modalStore } from '../../store';
import Button from '../../UI/Button/Button';
import styles from './choiseModal.module.scss';

const ChoiseModal = () => {
  const modalObj = {
    deleteAd: {
      emoji: '😔',
      title: 'Удалить объявление?',
      description: 'Объявление удалится навсегда!',
      button1: 'Отменить',
      button2: 'Удалить',
    },
    hideAd: {
      emoji: '🙃',
      title: 'Скрыть объявление?',
      description: 'Объявление больше не будет доступно для просмотра в маркетплейсе',
      button1: 'Отменить',
      button2: 'Скрыть',
    },
    exit: {
      emoji: '🤔',
      title: 'Вы действительно\nхотите выйти?',
      description: 'Все данные будут сохранены!',
      button1: 'Нет',
      button2: 'Да',
    },
  };

  return (
    modalStore.currentChoise && (
      <div className={styles.wrapper}>
        <div className={styles.emoji}>{modalObj[modalStore.currentChoise].emoji}</div>
        <div className={styles.title}>{modalObj[modalStore.currentChoise].title}</div>
        <div className={styles.description}>
          {modalObj[modalStore.currentChoise].description}
        </div>
        <div className={styles.buttonGrp}>
          <Button color='white' type='button' handler={modalStore.closeModal}>
            {modalObj[modalStore.currentChoise].button1}
          </Button>
          <Button color='blue' type='button' handler={modalStore.closeModal}>
            {modalObj[modalStore.currentChoise].button2}
          </Button>
        </div>
      </div>
    )
  );
};

export default ChoiseModal;
