import { ReactNode } from 'react';

import styles from './button.module.scss';

interface IButton {
  color: 'red' | 'white' | 'blue' | 'orange' | 'whiteWithoutBorder';
  children?: ReactNode;
  handler?: () => void;
  disabled?: boolean;
  width?: string;
  type: 'button' | 'submit';
}

const Button = ({
  color,
  children,
  handler,
  disabled = false,
  width,
  type = 'button',
}: IButton) => {
  return (
    <button
      disabled={disabled}
      onClick={handler}
      className={styles[color]}
      style={{ width: width }}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
