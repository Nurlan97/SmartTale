import { observer } from 'mobx-react-lite';
import { useLocation } from 'react-router-dom';

import { Card as ICard, PurchaseSummary } from '../../api/data-contracts';
import { defaultImage, defaultPhoto } from '../../assets';
import { modalStore, navbarStore } from '../../store';
import Button from '../../UI/Button/Button';
import { cutText } from '../../utils/helpers';
import styles from './card.module.scss';
interface IProps {
  card: PurchaseSummary | ICard;
}
const Card = observer(({ card }: IProps) => {
  const id = 'purchaseId' in card ? card.purchaseId : card.advertisementId;
  const location = useLocation();
  const buttonHandler = () => {
    modalStore.openDescription(id, location.pathname);
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
            {'price' in card ? `${card.price} сом` : 'Договорная'}
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
