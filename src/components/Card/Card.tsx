import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';

import { Card as ICard } from '../../api/data-contracts';
import { defaultImage, defaultPhoto } from '../../assets';
import { modalStore, navbarStore } from '../../store';
import Button from '../../UI/Button/Button';
import { cutText } from '../../utils/helpers';
import styles from './card.module.scss';
interface IProps {
  card: Omit<ICard, 'publishedAt'>;
}
const Card = observer(({ card }: IProps) => {
  const location = useLocation();
  const buttonHandler = () => {
    console.log('id', card);
    modalStore.openDescription(card.advertisementId, location.pathname);
  };
  return (
    <div className={styles.cardWrapper}>
      <img
        className={styles.cardImage}
        src={card.imageUrl ? card.imageUrl : defaultImage}
        alt=''
      />
      <div className={styles.descriptionWrapper}>
        <div className={styles.headBlock}>
          <span>{cutText(card.title, 15)}</span>
          <span className={styles.price}>
            {card.price ? `${card.price} сом` : 'Договорная'}
          </span>
        </div>
        <div className={styles.authorBlock}>
          <img
            className={styles.authorImage}
            src={card.publisherAvatarUrl ? card.publisherAvatarUrl : defaultPhoto}
            alt=''
          />
          <div>
            <div className={styles.author}>{card.publisherName}</div>
            <div className={styles.authorLabel}>{'Автор объявления'}</div>
          </div>
        </div>
        <div className={styles.description}>{cutText(card.description, 80)}</div>
        <Button color='white' type='button' width='100%' handler={buttonHandler}>
          Подробнее
        </Button>
      </div>
    </div>
  );
});

export default Card;
