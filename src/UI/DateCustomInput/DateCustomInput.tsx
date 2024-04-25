import React, { forwardRef, LegacyRef } from 'react';

import { Calendar } from '../../assets';
import styles from './dateCustomInput.module.scss';

type CustomInputProps = {
  value?: string;
  onClick?: () => void;
};

const DateCustomInput = (props: CustomInputProps, ref: LegacyRef<HTMLButtonElement>) => {
  const { value, onClick } = props;
  return (
    <div className={styles.withLabel}>
      <label className={styles.label}>
        {'Нажмите, чтобы выбрать дату'}
        <button
          type='button'
          className={styles.input}
          onClick={() => onClick?.()}
          ref={ref}
        >
          <Calendar />
          <div>{value}</div>
        </button>
      </label>
    </div>
  );
};
export default forwardRef<HTMLButtonElement, CustomInputProps>(DateCustomInput);
