import { observer } from 'mobx-react-lite';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import styles from './App.module.scss';
import AuthRoute from './components/AuthRoute/AuthRoute';
import ModalContainer from './components/ModalContainer/ModalContainer';
import NavBar from './components/NavBar/NavBar';
import NoAuthRoute from './components/NoAuthRoute/NoAuthRoute';
import AuthorizationPage from './pages/AuthorizationPage/AuthorizationPage';
import CreatePosition from './pages/CreatePosition/CreatePosition';
import CurrentOrdersPage from './pages/CurrentOrdersPage/CurrentOrdersPage';
import DetailedPage from './pages/DetailedPage/DetailedPage';
import EmployeeDetails from './pages/EmployeeDetails/EmployeeDetails';
import Employees from './pages/Employees/Employees';
import EquipmentPage from './pages/EquipmentPage/EquipmentPage';
import HistoryPage from './pages/HistoryPage/HistoryPage';
import InviteEmployee from './pages/InviteEmployee/InviteEmployee';
import JobPage from './pages/JobPage/JobPage';
import MyAdsPage from './pages/MyAdsPage/MyAdsPage';
import MyPurchases from './pages/MyPurchases/MyPurchases';
import OrderHistoryPage from './pages/OrderHistoryPage/OrderHistoryPage';
import OrganizationPage from './pages/OrganizationPage/OrganizationPage';
import PlaceAdvage from './pages/PlaceAdvPage/PlaceAdvPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Roles from './pages/Roles/Roles';
import SearchPage from './pages/SearchPage/SearchPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import UpdatePosition from './pages/UpdatePosition/UpdatePosition';
import { userStore } from './store';
import { getCookie, isTokenExpired, removeCookie } from './utils/helpers';

const App = observer(() => {
  const navigate = useNavigate();

  useLayoutEffect(() => {
    const func = async () => {
      if (!userStore.isAuth) {
        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');
        if (!!accessToken && !!refreshToken) {
          if (!isTokenExpired(accessToken)) {
            userStore.setTokens(accessToken, refreshToken, true);
            userStore.getUser();
            navigate('/equipment');
            // if (!notifyStore.client) {
            //   notifyStore.connect();
            // }
            return;
          }
          if (!isTokenExpired(refreshToken)) {
            await userStore.refreshTokens(refreshToken, true);
            userStore.getUser();
            navigate('/equipment');
            // if (!notifyStore.client) {
            //   notifyStore.connect();
            // }
            return;
          }
        }
        removeCookie('accessToken');
        removeCookie('refreshToken');
      } else {
        // notifyStore.connect();
      }
    };
    func();
  }, []);

  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);

  useLayoutEffect(() => {
    const noNavbarRoutes = ['/registration', '/authorization'];
    setShowNavbar(!noNavbarRoutes.includes(location.pathname));
  }, [location]);

  return (
    <div className={showNavbar ? styles.withNavbar : styles.auth}>
      {showNavbar && <NavBar path={location.pathname.slice(1)} />}
      {showNavbar && <div>navbar will be here</div>}
      <div className={showNavbar ? styles.page : ''}>
        <Routes>
          <Route path='/equipment' element={<EquipmentPage />} />
          <Route path='/services' element={<ServicesPage />} />
          <Route path='/job' element={<JobPage />} />
          <Route element={<AuthRoute />}>
            <Route path='/history' element={<HistoryPage />} />
            <Route path='/orders-active' element={<CurrentOrdersPage />} />
            <Route path='/place-adv' element={<PlaceAdvage />} />
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/my-ads' element={<MyAdsPage />} />
            <Route path='/my-ads/:id' element={<DetailedPage />} />
            <Route path='/my-purchases' element={<MyPurchases />} />
            <Route path='/orders-history' element={<OrderHistoryPage />} />
            <Route path='/company' element={<OrganizationPage />} />
            <Route path='/company-information' element={<OrganizationPage />} />
            <Route path='/employees' element={<Employees />} />
            <Route path='/employees/invite' element={<InviteEmployee />} />
            <Route path='/employees/:id' element={<EmployeeDetails />} />
            <Route path='/roles' element={<Roles />} />
            <Route path='/positions/create' element={<CreatePosition />} />
            <Route path='/positions/update/:id' element={<UpdatePosition />} />
            <Route path='/company-history' element={<OrganizationPage />} />
            <Route path='/search' element={<SearchPage />} />
          </Route>
          <Route element={<NoAuthRoute />}>
            <Route path='/registration' element={<RegistrationPage />}></Route>
            <Route path='/authorization' element={<AuthorizationPage />}></Route>
          </Route>
        </Routes>
      </div>
      <ModalContainer />
    </div>
  );
});

export default App;
