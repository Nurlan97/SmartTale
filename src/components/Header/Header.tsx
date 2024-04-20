import { Bell } from '../../assets';
import Input from '../../UI/Input/Input';
import styles from './header.module.scss';
interface IHeader {
  path: string;
  title: string;
}
const Header = ({ path, title }: IHeader) => {
  return (
    <div>
      <div className={styles.path}>{path}</div>
      <div>
        <span>{title}</span>
        <Input onChange={() => console.log('search')} value='' search={true} />
        <Bell />
      </div>
    </div>
  );
};

export default Header;
