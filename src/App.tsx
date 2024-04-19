import { Route, Routes } from 'react-router-dom';

import styles from './App.module.scss';
import NavBar from './components/NavBar/NavBar';
import Equipment from './pages/Equipment/Equipment';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <div className={styles.page}>
        <Routes>
          {/* <Route path='' element={<Profile />} /> */}
          <Route path='/equipment' element={<Equipment />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
