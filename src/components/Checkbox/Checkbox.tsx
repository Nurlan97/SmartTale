import { RiCheckboxFill } from 'react-icons/ri';

import styles from './Checkbox.module.scss';

type CheckboxType = {
  checked: boolean;
  onClick: () => void;
};

const Checkbox = ({ checked, onClick }: CheckboxType) => {
  return (
    <div
      className={styles.wrapper}
      onClick={onClick}
      onKeyUp={(event) => {
        if (event.key === 'Enter') {
          onClick();
        }
      }}
      role='button'
      tabIndex={0}
    >
      {checked ? (
        <RiCheckboxFill className={styles.checked} />
      ) : (
        <div className={styles.unchecked}></div>
      )}
      <p>Запомнить меня</p>
    </div>
  );
};

export default Checkbox;
