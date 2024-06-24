import { observer } from 'mobx-react-lite';
import { RefObject, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Login,
  NavbarExit,
  NavbarMarket,
  NavbarOrders,
  NavbarOrganization,
  NavbarProfile,
} from '../../assets';
import { modalStore, userStore } from '../../store';
import { Modals } from '../../store/modalStore';
import navbarStore from '../../store/navbarStore';
import NavbarLink from '../../UI/NavbarLink/NavbarLink';
import NavbarTab from '../../UI/NavbarTab/NavbarTab';
import { collapseCalc } from '../../utils/navbarHelpers';
import styles from './navBar.module.scss';

interface INavBar {
  path: string;
}
const NavBar = observer(({ path }: INavBar) => {
  const navigate = useNavigate();
  const profileRef = useRef<HTMLDivElement>(null);
  const ordersRef = useRef<HTMLDivElement>(null);
  const marketRef = useRef<HTMLDivElement>(null);
  const organizationRef = useRef<HTMLDivElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);
  const refObj: {
    [key: string]: RefObject<HTMLDivElement>;
  } = {
    profile: profileRef,
    orders: ordersRef,
    market: marketRef,
    organization: organizationRef,
    exit: exitRef,
  };

  const extendedLinkGroup = (current: string) => {
    return current === 'extended'
      ? styles.navbarLinkGroupExtended
      : styles.navbarLinkGroupRolled;
  };
  const [windowSize, setWindowSize] = useState({ height: 0 });

  const handleSize = () => {
    setWindowSize({
      height: window.innerHeight,
    });
  };

  useLayoutEffect(() => {
    handleSize();
    navbarStore.setActive(path);
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
      {userStore.isAuth && (
        <>
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
              <NavbarLink title='Мои покупки' to='my-purchases' />
              {(!!userStore.subscribePeriod || !!userStore.orgId) && (
                <NavbarLink title='История заказов' to='orders-history' />
              )}
              {(!!userStore.subscribePeriod || !!userStore.orgId) && (
                <NavbarLink title='Организация' to='company' />
              )}
            </div>
          </div>
          {/* <div className={styles.horizontalLine}></div>
          {!!userStore.orgId && (
            <>
              <div className={styles.navbarGroup}>
                <NavbarTab
                  SVG={<NavbarOrders />}
                  currentRef={ordersRef}
                  slag='orders'
                  title='Заказы'
                  collapsed={navbarStore.tabs.orders}
                />
                <div
                  ref={ordersRef}
                  className={extendedLinkGroup(navbarStore.tabs.orders)}
                >
                  <NavbarLink title='Текущие заказы' to='orders-active' />
                  <NavbarLink title='История' to='history' />
                </div>
              </div>
              <div className={styles.horizontalLine}></div>
            </>
          )} */}
        </>
      )}

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
          <NavbarLink title='Заказы' to='services' />
          <NavbarLink title='Вакансии' to='job' />
          {userStore.isAuth && (
            <NavbarLink title='Разместить объявление' to='place-adv' />
          )}
        </div>
      </div>

      {userStore.isAuth && (!!userStore.subscribePeriod || !!userStore.orgId) && (
        <>
          <div className={styles.horizontalLine}></div>
          <div className={styles.navbarGroup}>
            <NavbarTab
              SVG={<NavbarOrganization />}
              currentRef={organizationRef}
              slag='organization'
              title='Организация'
              collapsed={navbarStore.tabs.organization}
            />

            <div
              ref={organizationRef}
              className={extendedLinkGroup(navbarStore.tabs.organization)}
            >
              <NavbarLink title='Информация' to='company-information' />
              <NavbarLink title='Сотрудники' to='employees' />
              <NavbarLink title='Вакансии' to='vacancy' />
              <NavbarLink title='Должности' to='roles' />
              <NavbarLink title='Текущие заказы' to='orders-active' />
              <NavbarLink title='История' to='history' />
              {/* <NavbarLink title='История' to='company-history' /> */}
            </div>
          </div>
        </>
      )}

      <div ref={exitRef} className={styles.navbarFooter}>
        {userStore.isAuth ? (
          <button
            className={styles.navbarExtit}
            onClick={() => modalStore.openModal(Modals.exit)}
          >
            <NavbarExit />
            <span className={styles.navbarExtitText}>Выйти</span>
          </button>
        ) : (
          <button
            className={styles.navbarExtit}
            onClick={() => navigate('/authorization')}
          >
            <Login className={styles.loginIcon} />
            <span className={styles.navbarExtitText}>Войти</span>
          </button>
        )}
      </div>
    </div>
  );
});

export default NavBar;
