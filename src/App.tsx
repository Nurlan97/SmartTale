import styles from './App.module.scss';
import NavBar from './components/NavBar/NavBar';

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.auth}>
        <NavBar />
        <div>Hello world!!!</div>
      </div>
    </div>
  );
}

export default App;
