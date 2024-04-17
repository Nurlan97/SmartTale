import styles from './input.module.scss';

interface IInput {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  label?: string;
  multistring?: boolean;
  width?: string;
  height?: string;
  required?: boolean;
}
const Input = ({
  placeholder,
  multistring = false,
  required = false,
  value,
  onChange,
  width,
  height,
  label,
}: IInput) => {
  if (multistring) return <textarea></textarea>;
  return (
    <div className={label ? styles.withLabel : styles.withoutLabel}>
      <label className={styles.label}>
        {label}
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.input}
          style={{ height: height, width: width }}
        />
      </label>
    </div>
  );
};

export default Input;
