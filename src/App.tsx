import { Route, Routes } from 'react-router-dom';

import styles from './App.module.scss';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className={styles.App}>
      <NavBar />
      <div style={{ backgroundColor: 'rgba(248, 249, 250, 1)' }}>
        <Routes>
          {/* <Route path='' element={<Profile />} /> */}
          {/* <Route path='' element={<Market />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
