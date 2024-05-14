import { ReactNode } from 'react';

import styles from './button.module.scss';

interface IButton {
  color: 'red' | 'white' | 'blue' | 'orange' | 'whiteWithoutBorder';
  children?: ReactNode;
  handler?: () => void;
  disabled?: boolean;
  width?: string;
  height?: string;
  type: 'button' | 'submit';
  margin?: string;
}

const Button = ({
  color,
  children,
  handler,
  disabled = false,
  width,
  height,
  type = 'button',
  margin = '0',
}: IButton) => {
  return (
    <button
      disabled={disabled}
      onClick={handler}
      className={styles[color]}
      style={{ width: width, margin: margin, height: height }}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
