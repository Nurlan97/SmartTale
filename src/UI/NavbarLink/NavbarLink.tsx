import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

import navbarStore from '../../store/navbarStore';
import styles from './navbarLink.module.scss';

interface INavbarLink {
  title: string;
  to: string;
}
const NavbarLink = observer(({ title, to }: INavbarLink) => {
  const activeLink = (active: string, current: string) =>
    active === current ? styles.linkActive : styles.link;
  return (
    <NavLink
      onClick={() => navbarStore.setActive(to)}
      className={activeLink(navbarStore.activeLink, to)}
      to={`/${to}`}
    >
      {title}
    </NavLink>
  );
});

export default NavbarLink;
