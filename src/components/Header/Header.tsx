import { useEffect, useState } from 'react';

import { Bell } from '../../assets';
import { notifyStore } from '../../store';
import SearchInput from '../../UI/SearchInput/SearchInput';
import Notifications from '../Notifications/Notifications';
import styles from './header.module.scss';
interface IHeader {
  path: string;
  title: string;
}
const Header = ({ path, title }: IHeader) => {
  const thin = window.innerWidth < 990;
  let timeout: NodeJS.Timeout;
  const [showNotify, setShowNotify] = useState(false);
  const mouseEnterHandler = () => {
    if (timeout) clearTimeout(timeout);
    setShowNotify(true);
  };
  const mouseLeaveHandler = () => {
    timeout = setTimeout(() => {
      setShowNotify(false);
    }, 2000);
  };

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
          <Bell onMouseEnter={mouseEnterHandler} onMouseLeave={mouseLeaveHandler} />
          {showNotify && (
            <Notifications
              onMouseEnter={mouseEnterHandler}
              onMouseLeave={mouseLeaveHandler}
            />
          )}
        </div>
      </div>
      <div className={styles.horizontalLine}></div>
    </div>
  );
};

export default Header;
