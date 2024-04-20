import { Search } from '../../assets';
import styles from './searchInput.module.scss';
interface IInput {
  disabled?: boolean; // в профиле вроде можно изменить данные, но не понятно как, может понадобится, если true, то выглядит как простое поле, только без возможности редактирования
  height?: string; // можно указать производльную высоту, обязательно строкой с единицой измерения
  onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>; // функция изменения значения как в простом инпуте
  placeholder?: string; // в дизайне не понятно нужно будет или нет, пусть будет
  searchHandler?: () => void; //функция поиска
  value: string; // собстенно значение как в простом инпуте
  width?: string; //можно указать производльную ширину, обязательно строкой с единицой измерения
  margin?: string;
}
const SearchInput = ({
  disabled = false,
  height,
  onChange,
  placeholder,
  searchHandler,
  value,
  width,
  margin = '0',
}: IInput) => {
  return (
    <div
      className={styles.withoutLabel}
      style={{
        borderColor: 'rgba(224, 229, 242, 1)',
        height: height,
        width: width,
        margin: margin,
      }}
    >
      <div className={styles.searchWrapper}>
        <button onClick={searchHandler}>
          <Search />
        </button>
        <input
          disabled={disabled}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={styles.input}
          type={'text'}
        />
      </div>
    </div>
  );
};

export default SearchInput;
