import { CheckMark, gift } from '../../assets';
import { userStore } from '../../store';
import Button from '../Button/Button';
import styles from './subscribe.module.scss';
interface Props {
  period: string;
}

const Subscribe = ({ period }: Props) => {
  return (
    <>
      {period ? (
        <div className={styles.withSubscribe}>
          <CheckMark />
          <div>
            <p>Подписка оформлена</p>
            <p>Срок: до {period}</p>
          </div>
        </div>
      ) : (
        <div className={styles.withoutSubscribe}>
          <div className={styles.withoutSubscribeGroup}>
            <img src={gift} alt='' className={styles.gift} />
            <div>
              <p>Оформите подписку, чтобы получить больше возможностей!</p>
              <p>С вами свяжется наш администратор 😉</p>
            </div>
          </div>

          <Button color='whiteWithoutBorder' type='button' handler={userStore.subscribe}>
            Отправить запрос на подписку
          </Button>
        </div>
      )}
    </>
  );
};

export default Subscribe;
