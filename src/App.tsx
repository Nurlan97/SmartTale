import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import styles from './App.module.scss';
import AuthRoute from './components/AuthRoute/AuthRoute';
import ModalContainer from './components/ModalContainer/ModalContainer';
import NavBar from './components/NavBar/NavBar';
import { DetailedPage } from './pages/DetailedPage/DetailedPage';
import EquipmentPage from './pages/EquipmentPage/EquipmentPage';
import MyAdsPage from './pages/MyAdsPage/MyAdsPage';
import PlaceOrderPage from './pages/PlaceOrderPage/PlaceOrderPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';

const App = observer(() => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    // Список путей, на которых навбар не должен отображаться, это страницы авторизаций
    const noNavbarRoutes = ['/registration', '/autorization'];
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
          <Route path='/place-order' element={<PlaceOrderPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/my-ads' element={<MyAdsPage />} />
          <Route path='/my-ads/:id' element={<DetailedPage />} />
          <Route element={<AuthRoute />}>
            {/*Сюда пихаем роуты до авторизации, чтобы страницы с авторизацией не были доступны авторизованному пользователю*/}
            <Route path='/registration' element={<RegistrationPage />}></Route>
            {/* <Route path='/autorization' element={<AuthorizationPAge />} /> */}
          </Route>
        </Routes>
      </div>
      <ModalContainer />
    </div>
  );
});

export default App;
