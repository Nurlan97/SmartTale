import { Bell } from '../../assets';
import SearchInput from '../../UI/SearchInput/SearchInput';
import styles from './header.module.scss';
interface IHeader {
  path: string;
  title: string;
}
const Header = ({ path, title }: IHeader) => {
  const thin = window.innerWidth < 990;
  return (
    <div className={styles.wrapper}>
      <div className={styles.path}>{path}</div>
      <div
        className={styles.main}
        style={{
          flexDirection: thin ? 'column' : 'row',
          alignItems: thin ? 'start' : 'center',
        }}
      >
        <span className={styles.title}>{title}</span>
        <div className={styles.searchGroup}>
          <SearchInput
            onChange={() => console.log('search')}
            value='test'
            width='400px'
          />
          <Bell />
        </div>
      </div>
      <div className={styles.horizontalLine}></div>
    </div>
  );
};

export default Header;
