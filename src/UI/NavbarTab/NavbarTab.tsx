import { observer } from 'mobx-react-lite';
import React, { useRef } from 'react';

import { ArrowDown, ArrowUp } from '../../assets';
import navbarStore from '../../store/navbarStore';
import { setHeight } from '../../utils/navbarHelpers';
import styles from './navbarTab.module.scss';

interface INavbarTab {
  title: string;
  SVG: JSX.Element;
  slag: 'profile' | 'orders' | 'market';
  currentRef: React.RefObject<HTMLDivElement>;
  collapsed: 'extended' | 'rolled up';
}

const NavbarTab = observer(({ title, SVG, slag, currentRef, collapsed }: INavbarTab) => {
  const activeGroup = (active: string, current: string) =>
    active === current ? styles.navbarGroupHeaderActive : styles.navbarGroupHeader;

  return (
    <button
      className={activeGroup(navbarStore.activeTab, slag)}
      onClick={() => {
        navbarStore.toggleTab(slag);
        setHeight(
          currentRef,
          navbarStore.tabs[slag] === 'rolled up' ? 'rolled up' : 'extended',
        );
      }}
    >
      {SVG}
      <span className={styles.navbarGroupHeaderText}>{title}</span>
      <div className={collapsed === 'rolled up' ? styles.arrow : styles.arrowReverse}>
        <ArrowDown />
      </div>
    </button>
  );
});

export default NavbarTab;
