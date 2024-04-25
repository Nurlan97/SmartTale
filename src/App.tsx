import { observer } from 'mobx-react-lite';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import styles from './App.module.scss';
import NavBar from './components/NavBar/NavBar';
// import Equipment from './pages/Equipment/Equipment';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import userStore from './store/userStore';

const App = observer(() => {
  return (
    <div className={styles.App}>
      {/* <NavBar /> */}
      {/* <div className={styles.page}> */}
      {/* <Routes> */}
      {/* <Route path='' element={<Profile />} />
          <Route path='/equipment' element={<Equipment />} /> */}
      {/* </Routes> */}
      {/* </div> */}
      {!userStore.isAuth && (
        <Routes>
          <Route path='/registration' element={<RegistrationPage />}></Route>
        </Routes>
      )}
    </div>
  );
});

export default App;
