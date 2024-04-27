import { observer } from 'mobx-react-lite';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import styles from './App.module.scss';
import NavBar from './components/NavBar/NavBar';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
// import EquipmentPage from './pages/EquipmentPage/EquipmentPage';
// import PlaceOrderPage from './pages/PlaceOrderPage/PlaceOrderPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import userStore from './store/userStore';

const App = observer(() => {
  return (
    <div className={styles.App}>
      {/* <NavBar /> */}
      {/* <div>navbar will be here</div> */}
      {/* <div className={styles.page}> */}
      {/* <Routes> */}
      {/* <Route path='' element={<Profile />} />
          <Route path='/equipment' element={<Equipment />} /> */}
      {/* <Route path='/services' element={<ServicesPage />} /> */}
      {/* </Routes> */}
      {/* </div> */}
      {!userStore.isAuth && (
        <Routes>
          <Route path='/registration' element={<RegistrationPage />}></Route>
        </Routes>
      )}
      <Routes>
        <Route path='/login' element={<AuthorizationPage />}></Route>
      </Routes>
    </div>
  );
});

export default App;
