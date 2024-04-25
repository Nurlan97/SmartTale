import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import styles from './App.module.scss';
import NavBar from './components/NavBar/NavBar';
import EquipmentPage from './pages/EquipmentPage/EquipmentPage';
import PlaceOrderPage from './pages/PlaceOrderPage/PlaceOrderPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import { userStore } from './store';

const App = observer(() => {
  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(true);

  useEffect(() => {
    // Список путей, на которых навбар не должен отображаться
    const noNavbarRoutes = ['/registration', '/autorization'];

    setShowNavbar(!noNavbarRoutes.includes(location.pathname));
  }, [location]);
  return (
    <>
      {showNavbar && (
        <div className={styles.withNavbar}>
          <NavBar />
          <div>navbar will be here</div>
          <div className={styles.page}>
            <Routes>
              <Route path='/equipment' element={<EquipmentPage />} />
              <Route path='/services' element={<ServicesPage />} />
              <Route path='/place-order' element={<PlaceOrderPage />} />
            </Routes>
          </div>
        </div>
      )}
      {!userStore.isAuth && (
        <div className={styles.auth}>
          <Routes>
            <Route path='/registration' element={<RegistrationPage />}></Route>
            {/* <Route path='/autorization' element={<AuthorizationPAge />} /> */}
          </Routes>
        </div>
      )}
    </>
  );
});

export default App;
