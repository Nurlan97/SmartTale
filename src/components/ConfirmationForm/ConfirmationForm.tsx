import { useState } from 'react';

import Button from '../../UI/Button/Button';
import InputCode from '../../UI/InputCode/InputCode';
import styles from './ConfirmationForm.module.scss';

const ConfirmationForm = () => {
  const [value, setValue] = useState('');
  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <InputCode setValue={setValue} margin={'60px'} />
        <Button color={'blue'} type={'submit'} width={'410px'}>
          Войти
        </Button>
      </form>
    </div>
  );
};

export default ConfirmationForm;
