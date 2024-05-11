import { useLocation } from 'react-router-dom';

import { Card as ICard } from '../../api/data-contracts';
import { modalStore, navbarStore } from '../../store';
import Button from '../../UI/Button/Button';
import { cutText } from '../../utils/helpers';
import styles from './card.module.scss';
interface IProps {
  card: Omit<ICard, 'publishedAt'>;
}
const Card = ({ card }: IProps) => {
  const location = useLocation();
  const buttonHandler = () => {
    console.log('id', card.productId);
    modalStore.openDescription(card.productId, location.pathname);
  };
  return (
    <div className={styles.cardWrapper}>
      <img className={styles.cardImage} src={card.imageUrl} alt='' />
      <div className={styles.descriptionWrapper}>
        <div className={styles.headBlock}>
          <span>{cutText(card.title, 20)}</span>
          <span className={styles.price}>{`${card.price} сом`}</span>
        </div>
        <div className={styles.authorBlock}>
          <img className={styles.authorImage} src={card.publisherAvatarUrl} alt='' />
          <div>
            <div className={styles.author}>{card.publishedBy}</div>
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
};

export default Card;
