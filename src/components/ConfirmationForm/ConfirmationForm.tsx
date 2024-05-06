import { observe } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { userStore } from '../../store';
import Button from '../../UI/Button/Button';
import InputCode from '../../UI/InputCode/InputCode';
import styles from './ConfirmationForm.module.scss';

const ConfirmationForm = observer(() => {
  const navigate = useNavigate();
  const [value, setValue] = useState('');

  const navigateHandler = () => {
    navigate('/equipment');
  };
  const resendBtnClick = (
    event: React.MouseEvent<HTMLButtonElement> | { key: string },
  ) => {
    if ('preventDefault' in event) {
      event.preventDefault();
    }
    userStore.resendVerification();
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') resendBtnClick(event);
  };
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
        <button
          className={styles.resendCode}
          onClick={resendBtnClick}
          // onKeyUp={handleKeyDown}
        >
          Отправить код повторно
        </button>
      </form>
    </div>
  );
});

export default ConfirmationForm;
