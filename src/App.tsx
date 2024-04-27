import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import styles from './App.module.scss';
import AuthRoute from './components/AuthRoute/AuthRoute';
import NavBar from './components/NavBar/NavBar';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import EquipmentPage from './pages/EquipmentPage/EquipmentPage';
import PlaceOrderPage from './pages/PlaceOrderPage/PlaceOrderPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import userStore from './store/userStore';

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
      {showNavbar && <NavBar />}
      {showNavbar && <div>navbar will be here</div>}
      <div className={showNavbar ? styles.page : styles.auth}>
        <Routes>
          <Route path='/equipment' element={<EquipmentPage />} />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/place-order' element={<PlaceOrderPage />} />
          <Route element={<AuthRoute />}>
            {/*Сюда пихаем роуты до авторизации, чтобы страницы с авторизацией не были доступны авторизованному пользователю*/}
            <Route path='/registration' element={<RegistrationPage />}></Route>
            <Route path='/login' element={<AuthorizationPage />}></Route>
            {/* <Route path='/autorization' element={<AuthorizationPAge />} /> */}
          </Route>
        </Routes>
      </div>
    </div>
  );
});

export default App;
