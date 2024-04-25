import styles from './phoneInput.module.scss';

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
}
const PhoneInput = ({
  border = false,
  disabled = false,
  height,
  id,
  isError = false,
  label,
  onChange,
  placeholder,
  required = false,
  value,
  width,
  margin = '0',
}: IInput) => {
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
      <label
        className={styles.label}
        htmlFor={id}
        style={disabled ? { pointerEvents: 'none' } : {}}
      >
        {label && (
          <div>
            {label}
            {required && <b style={{ color: 'red' }}>{' *'}</b>}
          </div>
        )}
        <div className={styles.phoneInput}>
          +996{' '}
          <input
            disabled={disabled}
            value={value}
            id={id}
            onChange={onChange}
            placeholder={placeholder}
            className={styles.input}
            type={'text'}
          />
        </div>
      </label>
    </div>
  );
};

export default PhoneInput;
