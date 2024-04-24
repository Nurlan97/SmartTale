import { observer } from 'mobx-react-lite';
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { NavbarExit, NavbarMarket, NavbarOrders, NavbarProfile } from '../../assets';
import navbarStore from '../../store/navbarStore';
import NavbarLink from '../../UI/NavbarLink/NavbarLink';
import NavbarTab from '../../UI/NavbarTab/NavbarTab';
import { collapseCalc } from '../../utils/navbarHelpers';
import styles from './navBar.module.scss';

const NavBar = observer(() => {
  const profileRef = useRef<HTMLDivElement>(null);
  const ordersRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);
  const refObj: {
    [key: string]: RefObject<HTMLDivElement>;
  } = {
    profile: profileRef,
    orders: ordersRef,
    market: marketRef,
    exit: exitRef,
  };

  const extendedLinkGroup = (current: string) => {
    return current === 'extended'
      ? styles.navbarLinkGroupExtended
      : styles.navbarLinkGroupRolled;
  };
  const [windowSize, setWindowSize] = useState({ width: 0 });

  const handleSize = () => {
    setWindowSize({
      width: window.innerWidth,
    });
  };

  useLayoutEffect(() => {
    handleSize();
    window.addEventListener('resize', handleSize);
    return () => window.removeEventListener('resize', handleSize);
  }, []);

  useEffect(() => {
    collapseCalc(refObj, profileRef, exitRef);
  }, [{ ...navbarStore.tabs }, windowSize]);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarHeader}>
        <div className={styles.navbarLogo}>ST</div>
        <h1 className={styles.navbarTitle}>SmartTale</h1>
        <div className={styles.navbarDescription}>
          Мониторинг и управление швейным производством
        </div>
      </div>

      <div className={styles.horizontalLine}></div>
      <div className={styles.navbarGroup}>
        <NavbarTab
          SVG={<NavbarProfile />}
          currentRef={profileRef}
          slag='profile'
          title='Личный кабинет'
          collapsed={navbarStore.tabs.profile}
        />
        <div ref={profileRef} className={extendedLinkGroup(navbarStore.tabs.profile)}>
          <NavbarLink title='Профиль' to='profile' />
          <NavbarLink title='Мои объявления' to='my-ads' />
          <NavbarLink title='Мои покупки' to='my-buys' />
          <NavbarLink title='История заказов' to='orders-history' />
          <NavbarLink title='Организация' to='company' />
        </div>
      </div>
      <div className={styles.horizontalLine}></div>
      <div className={styles.navbarGroup}>
        <NavbarTab
          SVG={<NavbarOrders />}
          currentRef={ordersRef}
          slag='orders'
          title='Заказы'
          collapsed={navbarStore.tabs.orders}
        />
        <div ref={ordersRef} className={extendedLinkGroup(navbarStore.tabs.orders)}>
          <NavbarLink title='Текущие заказы' to='orders-active' />
          <NavbarLink title='История' to='history' />
        </div>
      </div>
      <div className={styles.horizontalLine}></div>
      <div className={styles.navbarGroup}>
        <NavbarTab
          SVG={<NavbarMarket />}
          currentRef={marketRef}
          slag='market'
          title='Маркетплейс'
          collapsed={navbarStore.tabs.market}
        />

        <div ref={marketRef} className={extendedLinkGroup(navbarStore.tabs.market)}>
          <NavbarLink title='Оборудование' to='equipment' />
          <NavbarLink title='Услуги' to='services' />
          <NavbarLink title='Разместить заказ' to='place-order' />
        </div>
      </div>

      <div ref={exitRef} className={styles.navbarFooter}>
        <button className={styles.navbarExtit}>
          <NavbarExit />
          <span className={styles.navbarExtitText}>Выйти</span>
        </button>
      </div>
    </div>
  );
});

export default NavBar;
