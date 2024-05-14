import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { userStore } from '../../store';
import Button from '../../UI/Button/Button';
import InputCode from '../../UI/InputCode/InputCode';
import CountdownTimer from '../CountdownTimer/CountdownTimer';
import styles from './ConfirmationForm.module.scss';

const ConfirmationForm = observer(() => {
  const timer = 30;
  const navigate = useNavigate();
  const [value, setValue] = useState('');
  const [timerExpired, setTimerExpired] = useState(true);
  const [remainingTime, setRemainingTime] = useState(timer);

  const navigateHandler = () => {
    navigate('/equipment');
  };
  const resendBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    userStore.resendVerificationCode();
    setTimerExpired(false);
  };

  useEffect(() => {
    if (remainingTime > 0) {
      setTimeout(() => {
        setRemainingTime((prev) => prev - 1);
      }, 1000);
    } else {
      setTimerExpired(true);
      setRemainingTime(timer);
    }
  }, [remainingTime]);

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <InputCode setValue={setValue} margin={'60px'} isError={userStore.invalidCode} />
        <Button
          color={'blue'}
          type={'button'}
          width={'410px'}
          handler={() => {
            userStore.sendVerificationCode(
              { email: userStore.email, code: value },
              navigateHandler,
            );
          }}
        >
          Войти
        </Button>
        {timerExpired && (
          <>
            <button className={styles.resendCode} onClick={resendBtnClick}>
              Отправить код повторно
            </button>
          </>
        )}
        {!timerExpired && (
          <>
            <div className={styles.wrapper}>
              <CountdownTimer
                className={styles.counter}
                timer={remainingTime}
                text={'Вы сможете отправить код повторно через'}
              ></CountdownTimer>
            </div>
          </>
        )}
      </form>
    </div>
  );
});

export default ConfirmationForm;
