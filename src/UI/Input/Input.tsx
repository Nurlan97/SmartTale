import { useState } from 'react';

import { EyeClosed, EyeOpened } from '../../assets';
import styles from './input.module.scss';

interface IInput {
  border?: boolean; //добавить border
  disabled?: boolean; // в профиле вроде можно изменить данные, но не понятно как, может понадобится, если true, то выглядит как простое поле, только без возможности редактирования
  height?: string; // можно указать производльную высоту, обязательно строкой с единицой измерения
  isError?: boolean; // добавляет красную обводку
  label?: string; // добавляет надпись внутри инпута сверху
  multistring?: boolean; // для возможности вводить данные в несоклько строк
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>; // функция изменения значения как в простом инпуте
  password?: boolean; // если true добавляет иконки глаз и сам управляет видимостью пароля при нажатии на глаз
  placeholder?: string; // в дизайне не понятно нужно будет или нет, пусть будет
  required?: boolean; // если true добавляет красную звездочку в label
  value: string; // собстенно значение как в простом инпуте
  width?: string; //можно указать производльную ширину, обязательно строкой с единицой измерения
}
const Input = ({
  border = false,
  disabled = false,
  height,
  isError = false,
  label,
  multistring = false,
  onChange,
  password = false,
  placeholder,
  required = false,
  value,
  width,
}: IInput) => {
  const [hidden, setHidden] = useState(password);
  const borderColor = border ? 'rgba(224, 229, 242, 1)' : '';
  if (multistring)
    return (
      <div
        className={label ? styles.withLabel : styles.withoutLabel}
        style={{
          borderColor: isError ? 'red' : borderColor,
          height: height,
          width: width,
        }}
      >
        <label className={styles.label}>
          <div>
            {label}
            {required && <b style={{ color: 'red' }}>{' *'}</b>}
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
  return (
    <div
      className={label ? styles.withLabel : styles.withoutLabel}
      style={{ borderColor: isError ? 'red' : borderColor, height: height, width: width }}
    >
      <label className={styles.label} style={disabled ? { pointerEvents: 'none' } : {}}>
        {label && (
          <div>
            {label}
            {required && <b style={{ color: 'red' }}>{' *'}</b>}
          </div>
        )}
        <input
          disabled={disabled}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.input}
          type={hidden ? 'password' : 'text'}
        />
      </label>
      {password && (
        <button onClick={() => setHidden((prev) => !prev)}>
          {hidden ? <EyeClosed /> : <EyeOpened />}
        </button>
      )}
    </div>
  );
};

export default Input;
