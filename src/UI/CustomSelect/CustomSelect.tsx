import { observer } from 'mobx-react-lite';
import { useState } from 'react';

import { ArrowDown } from '../../assets';
import styles from './customSelet.module.scss';

type Props = {
  current: string | number;
  options: Array<{ key: string; value: string } | { positionId: number; title: string }>;
  handleChange: (option: string | number) => void;
};

const CustomSelect = observer(({ options, current, handleChange }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (option: string | number) => {
    handleChange(option);
    setIsOpen(false);
  };
  const currObj = options.find((obj) => {
    const key = 'key' in obj ? obj.key : obj.positionId;
    return key === current;
  });
  return (
    <div className={styles.wrapper}>
      <button type='button' onClick={toggleDropdown} className={styles.select}>
        <div>{currObj && 'value' in currObj ? currObj.value : currObj?.title}</div>
        <div>{!currObj && 'Выберите должность'}</div>
        <ArrowDown className={styles.arrow} />
      </button>

      {isOpen && (
        <div className={styles.list}>
          {options.map((option, index) => (
            <button
              className={styles.option}
              type='button'
              key={index}
              onClick={() =>
                handleSelect('title' in option ? option.positionId : option.key)
              }
            >
              {'title' in option ? option.title : option.value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

export default CustomSelect;
