import { useState } from 'react';

import styles from './App.module.scss';
import NavBar from './components/NavBar/NavBar';
import Input from './UI/Input/Input';

function App() {
  const [state, setState] = useState('');
  return (
    <div className={styles.App}>
      <div className={styles.auth}>
        <NavBar />
        <div style={{ backgroundColor: 'rgba(248, 249, 250, 1)' }}>Hello world!!!</div>
      </div>
    </div>
  );
}

export default App;
