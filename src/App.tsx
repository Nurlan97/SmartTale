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
        <div>
          Hello world!!!
          <Input
            value={state}
            onChange={(ev) => setState(ev.target.value)}
            label='test'
            placeholder='placeholder'
          ></Input>
          <Input
            value={state}
            onChange={(ev) => setState(ev.target.value)}
            placeholder='placeholder'
          ></Input>
        </div>
      </div>
    </div>
  );
}

export default App;
