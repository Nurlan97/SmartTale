import React from 'react';

import styles from './textarea.module.scss';

interface IInput {
  border?: boolean; //добавить border
  height?: string; // можно указать производльную высоту, обязательно строкой с единицой измерения
  isError?: boolean; // добавляет красную обводку
  label?: string; // добавляет надпись внутри инпута сверху
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>; // функция изменения значения как в простом инпуте
  placeholder?: string; // в дизайне не понятно нужно будет или нет, пусть будет
  required?: boolean; // если true добавляет красную звездочку в label
  value: string; // собстенно значение как в простом инпуте
  width?: string; //можно указать производльную ширину, обязательно строкой с единицой измерения
}

const Textarea = ({
  border = false,
  height,
  isError = false,
  label,
  onChange,
  placeholder,
  required = false,
  value,
  width,
}: IInput) => {
  const borderColor = border ? 'rgba(224, 229, 242, 1)' : '';
  return (
    <div
      className={label ? styles.withLabel : styles.withoutLabel}
      style={{
        borderColor: isError ? '#FF3B30' : borderColor,
        height: height,
        width: width,
      }}
    >
      <label className={styles.label}>
        <div>
          {label}
          {required && <b style={{ color: '#FF3B30' }}>{' *'}</b>}
        </div>
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.textarea}
        />
      </label>
    </div>
  );
};

export default Textarea;
