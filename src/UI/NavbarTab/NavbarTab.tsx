import React from 'react';

import navbarStore from '../../store/navbarStore';
import styles from './navbarTab.module.scss';

interface INavbarTab {
  title: string;
  SVG: JSX.Element;
  slag: 'profile' | 'orders' | 'market';
  currentRef: React.RefObject<HTMLDivElement>;
}
const NavbarTab = ({ title, SVG, slag, currentRef }: INavbarTab) => {
  const activeGroup = (active: string, current: string) =>
    active === current ? styles.navbarGroupHeaderActive : styles.navbarGroupHeader;
  const setHeight = (
    currentRef: React.RefObject<HTMLDivElement> | React.RefObject<HTMLButtonElement>,
    type: 'extended' | 'rolled up',
  ) => {
    if (currentRef.current) {
      currentRef.current.style.height = `${currentRef.current.scrollHeight}px`;
      setTimeout(() => {
        if (currentRef.current)
          currentRef.current.style.height =
            type === 'rolled up' ? '0' : `${currentRef.current.scrollHeight}px`;
      }, 0);
    }
  };
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
    </button>
  );
};

export default NavbarTab;
