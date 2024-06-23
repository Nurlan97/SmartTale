import './index.css';
import 'react-toastify/dist/ReactToastify.css';

import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import App from './App';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <HashRouter>
    <App />
    <ToastContainer />
  </HashRouter>,
);
