import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import styles from './App.module.scss';
import AuthRoute from './components/AuthRoute/AuthRoute';
import ModalContainer from './components/ModalContainer/ModalContainer';
import NavBar from './components/NavBar/NavBar';
import NoAuthRoute from './components/NoAuthRoute/NoAuthRoute';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import DetailedPage from './pages/DetailedPage/DetailedPage';
import EquipmentPage from './pages/EquipmentPage/EquipmentPage';
import MyAdsPage from './pages/MyAdsPage/MyAdsPage';
import MyPurchases from './pages/MyBuys/MyPurchases';
import OrderHistoryPage from './pages/OrderHistoryPage/OrderHistoryPage';
import OrganizationPage from './pages/OrganizationPage/OrganizationPage';
import PlaceOrderPage from './pages/PlaceOrderPage/PlaceOrderPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import { userStore } from './store';
import { getCookie, isTokenExpired, removeCookie } from './utils/helpers';

const App = observer(() => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!userStore.isAuth) {
      const accessToken = getCookie('accessToken');
      const refreshToken = getCookie('refreshToken');
      if (!!accessToken && !!refreshToken && !isTokenExpired(accessToken)) {
        userStore.setTokens(accessToken, refreshToken);
        userStore.getUser();
        userStore.isAuth = true;
        navigate('/equipment');
        return;
      }
      if (!!refreshToken && !isTokenExpired(refreshToken)) {
        userStore.refreshTokens(refreshToken);
        userStore.getUser();
        userStore.isAuth = true;
        navigate('/equipment');
        return;
      }
      removeCookie('accessToken');
      removeCookie('refreshToken');
    }
  });
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    const noNavbarRoutes = ['/registration', '/authorization'];
    setShowNavbar(!noNavbarRoutes.includes(location.pathname));
  }, [location]);

  return (
    <div className={showNavbar ? styles.withNavbar : styles.auth}>
      {showNavbar && <NavBar path={location.pathname.slice(1)} />}
      {showNavbar && <div>navbar will be here</div>}
      <div className={showNavbar ? styles.page : ''}>
        <Routes>
          <Route path='/equipment' element={<EquipmentPage />} />
          <Route path='/services' element={<ServicesPage />} />

          <Route element={<AuthRoute />}>
            <Route path='/place-order' element={<PlaceOrderPage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/my-ads' element={<MyAdsPage />} />
            <Route path='/my-ads/:id' element={<DetailedPage />} />
            <Route path='/my-purchases' element={<MyPurchases />} />
            <Route path='/orders-history' element={<OrderHistoryPage />} />
            <Route path='/company' element={<OrganizationPage />} />
          </Route>
          <Route element={<NoAuthRoute />}>
            <Route path='/registration' element={<RegistrationPage />}></Route>
            <Route path='/authorization' element={<AuthorizationPage />}></Route>
          </Route>
        </Routes>
      </div>
      <ModalContainer />
    </div>
  );
});

export default App;
