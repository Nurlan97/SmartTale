import { useLocation, useNavigate } from 'react-router-dom';

import { appStore, modalStore, userStore } from '../../store';
import { Modals } from '../../store/modalStore';
import Button from '../../UI/Button/Button';
import styles from './choiseModal.module.scss';

const ChoiseModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = Number(location.pathname.split('/').pop());
  const map = new Map();
  map.set(Modals.deleteAd, {
    emoji: '😔',
    title: 'Удалить объявление?',
    description: 'Объявление удалится навсегда!',
    button1: 'Отменить',
    button2: 'Удалить',
    handler: () => {
      appStore.deleteAd(id);
      navigate(-1);
    },
  });
  map.set(Modals.hideAd, {
    emoji: '🙃',
    title: 'Скрыть объявление?',
    description: 'Объявление больше не будет доступно для просмотра в маркетплейсе',
    button1: 'Отменить',
    button2: 'Скрыть',
    handler: () => {
      appStore.closeAd(id);
      navigate(-1);
    },
  });
  map.set(Modals.exit, {
    emoji: '🤔',
    title: 'Вы действительно\nхотите выйти?',
    description: 'Все данные будут сохранены!',
    button1: 'Нет',
    button2: 'Да',
    handler: () => {
      userStore.logout();
      modalStore.closeModal();
      navigate('/authorization');
    },
  });

  return (
    modalStore.currentModal && (
      <div className={styles.wrapper}>
        <div className={styles.emoji}>{map.get(modalStore.currentModal).emoji}</div>
        <div className={styles.title}>{map.get(modalStore.currentModal).title}</div>
        <div className={styles.description}>
          {map.get(modalStore.currentModal).description}
        </div>
        <div className={styles.buttonGrp}>
          <Button color='white' type='button' handler={modalStore.closeModal}>
            {map.get(modalStore.currentModal).button1}
          </Button>
          <Button
            color='blue'
            type='button'
            handler={() => {
              map.get(modalStore.currentModal).handler();
            }}
          >
            {map.get(modalStore.currentModal).button2}
          </Button>
        </div>
      </div>
    )
  );
};

export default ChoiseModal;
