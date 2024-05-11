import { useState } from 'react';

import { EyeClosed, EyeOpened } from '../../assets';
import styles from './input.module.scss';

interface IInput {
  border?: boolean; //добавить border
  disabled?: boolean; // в профиле вроде можно изменить данные, но не понятно как, может понадобится, если true, то выглядит как простое поле, только без возможности редактирования
  height?: string; // можно указать производльную высоту, обязательно строкой с единицой измерения
  id?: string; // для проброса id для внешнего label
  isError?: boolean; // добавляет красную обводку
  label?: string; // добавляет надпись внутри инпута сверху
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>; // функция изменения значения как в простом инпуте
  password?: boolean; // если true добавляет иконки глаз и сам управляет видимостью пароля при нажатии на глаз
  placeholder?: string; // в дизайне не понятно нужно будет или нет, пусть будет
  required?: boolean; // если true добавляет красную звездочку в label
  value: string; // собстенно значение как в простом инпуте
  width?: string; //можно указать производльную ширину, обязательно строкой с единицой измерения
  margin?: string;
  onBlur?: (e: React.FocusEvent<any, Element>) => void;
}
const Input = ({
  border = false,
  disabled = false,
  height,
  id,
  isError = false,
  label,
  onChange,
  password = false,
  placeholder,
  required = false,
  value,
  width,
  margin = '0',
  onBlur,
}: IInput) => {
  const [hidden, setHidden] = useState(password);
  const borderColor = border ? 'rgba(224, 229, 242, 1)' : '';

  return (
    <div
      className={label ? styles.withLabel : styles.withoutLabel}
      style={{
        borderColor: isError ? 'red' : borderColor,
        height: height,
        width: width,
        margin: margin,
      }}
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
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.input}
          type={hidden ? 'password' : 'text'}
          onBlur={onBlur}
        />
      </label>
      {password && (
        <button type='button' onClick={() => setHidden((prev) => !prev)}>
          {hidden ? <EyeClosed /> : <EyeOpened />}
        </button>
      )}
    </div>
  );
};

export default Input;
