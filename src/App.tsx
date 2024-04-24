import { Route, Routes } from 'react-router-dom';

import styles from './App.module.scss';
import NavBar from './components/NavBar/NavBar';
import EquipmentPage from './pages/EquipmentPage/EquipmentPage';
import PlaceOrderPage from './pages/PlaceOrderPage/PlaceOrderPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <div>navbar will be here</div>
      <div className={styles.page}>
        <Routes>
          {/* <Route path='' element={<Profile />} /> */}
          <Route path='/equipment' element={<EquipmentPage />} />
          <Route path='/services' element={<ServicesPage />} />
          {/* <Route path='/place-order' element={<PlaceOrderPage />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
