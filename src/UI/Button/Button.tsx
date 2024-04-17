import { ReactNode } from 'react';

import styles from './button.module.scss';

interface IButton {
  color: 'red' | 'white' | 'blue' | 'orange' | 'whiteWithoutBorder';
  children?: ReactNode;
  handler: () => void;
  disabled?: boolean;
  width?: string;
}

const Button = ({ color, children, handler, disabled = false, width }: IButton) => {
  return (
    <button
      disabled={disabled}
      onClick={handler}
      className={styles[color]}
      style={{ width: width }}
    >
      {children}
    </button>
  );
};

export default Button;
