import Button from '../../UI/Button/Button';
import { cutText } from '../../utils/helpers';
import { ICard } from '../../utils/types';
import styles from './card.module.scss';

const Card = ({ id, author, authorImage, description, image, price, title }: ICard) => {
  return (
    <div className={styles.cardWrapper}>
      <img className={styles.cardImage} src={image} alt='' />
      <div className={styles.descriptionWrapper}>
        <div className={styles.headBlock}>
          <span>{cutText(title, 20)}</span>
          <span className={styles.price}>{`${price} сом`}</span>
        </div>
        <div className={styles.authorBlock}>
          <img className={styles.authorImage} src={authorImage} alt='' />
          <div>
            <div className={styles.author}>{author}</div>
            <div className={styles.authorLabel}>{'Автор объявления'}</div>
          </div>
        </div>
        <div className={styles.description}>{cutText(description, 80)}</div>
        <Button color='white' type='button' width='100%'>
          Подробнее
        </Button>
      </div>
    </div>
  );
};

export default Card;
