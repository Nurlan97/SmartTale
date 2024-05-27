import { forwardRef, LegacyRef } from 'react';

import { Calendar } from '../../assets';
import { formatDate2 } from '../../utils/helpers';
import styles from './dateRangeCustomInput.module.scss';

type CustomInputProps = {
  value?: string;
  onClick?: () => void;
};

const DateCustomInput = (props: CustomInputProps, ref: LegacyRef<HTMLButtonElement>) => {
  const { value, onClick } = props;
  const newDates = value?.split(' - ');
  return (
    <div className={styles.wrapper}>
      <button
        type='button'
        className={styles.button}
        onClick={() => onClick?.()}
        ref={ref}
      >
        <Calendar />
        <div>{`${newDates ? formatDate2(newDates[0]) : ''} - ${newDates ? formatDate2(newDates[1]) : ''}`}</div>
      </button>
    </div>
  );
};
export default forwardRef<HTMLButtonElement, CustomInputProps>(DateCustomInput);
