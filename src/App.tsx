import { observer } from 'mobx-react-lite';
import { useLayoutEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import styles from './App.module.scss';
import AuthRoute from './components/AuthRoute/AuthRoute';
import ModalContainer from './components/ModalContainer/ModalContainer';
import NavBar from './components/NavBar/NavBar';
import NoAuthRoute from './components/NoAuthRoute/NoAuthRoute';
import AcceptOrder from './pages/AcceptOrder/AcceptOrder';
import AdminOrganizationPage from './pages/AdminOrganizationPage/AdminOrganizationPage';
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
import NotFound from './pages/NotFound/NotFound';
import OrderHistoryPage from './pages/OrderHistoryPage/OrderHistoryPage';
import OrganizationPage from './pages/OrganizationPage/OrganizationPage';
import OrganizationVacancy from './pages/OrganizationVacancy/OrganizationVacancy';
import PlaceAdvage from './pages/PlaceAdvPage/PlaceAdvPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import Roles from './pages/Roles/Roles';
import SearchPage from './pages/SearchPage/SearchPage';
import ServicesPage from './pages/ServicesPage/ServicesPage';
import TaskDetailedPage from './pages/TaskDetailedPage/TaskDetailedPage';
import UpdatePosition from './pages/UpdatePosition/UpdatePosition';
import VacancyAd from './pages/VacancyAd/VacancyAd';
import { userStore } from './store';
import { getCookie, isTokenExpired, removeCookie } from './utils/helpers';
import AdminJobPositionsPage from './pages/AdminJobPositionsPage/AdminJobPositionsPage';

const App = observer(() => {
  const [isLoading, setIsLoading] = useState(true);
  useLayoutEffect(() => {
    const func = async () => {
      if (!userStore.isAuth) {
        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');
        if (!!accessToken && !!refreshToken) {
          if (!isTokenExpired(accessToken)) {
            userStore.setTokens(accessToken, refreshToken, true);
            userStore.getUser();
            setIsLoading(false);
            return;
          }
          if (!isTokenExpired(refreshToken)) {
            await userStore.refreshTokens(refreshToken, true);
            userStore.getUser();
            setIsLoading(false);
            return;
          }
        }
        removeCookie('accessToken');
        removeCookie('refreshToken');
      }
      setIsLoading(false);
    };
    func();
  }, []);

  const location = useLocation();
  const [showNavbar, setShowNavbar] = useState(false);

  useLayoutEffect(() => {
    const noNavbarRoutes = ['/registration', '/authorization'];
    setShowNavbar(!noNavbarRoutes.includes(location.pathname));
  }, [location]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className={showNavbar ? styles.withNavbar : styles.auth}>
      {showNavbar && <NavBar path={location.pathname.slice(1)} />}
      {showNavbar && <div>navbar will be here</div>}
      <div className={showNavbar ? styles.page : ''}>
        <Routes>
          <Route path='/equipment' element={<EquipmentPage />} />
          <Route path='/' element={<EquipmentPage />} />
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
            <Route path='/company-information' element={<AdminOrganizationPage />} />
            <Route path='/employees' element={<Employees />} />
            <Route path='/employees/invite' element={<InviteEmployee />} />
            <Route path='/employees/:id' element={<EmployeeDetails />} />
            <Route path='/roles' element={<Roles />} />
            <Route path='/positions/create' element={<CreatePosition />} />
            <Route path='/positions/update/:id' element={<UpdatePosition />} />
            <Route path='/company-history' element={<OrganizationPage />} />
            <Route path='/task/:id' element={<TaskDetailedPage />} />
            <Route path='/search' element={<SearchPage />} />
            <Route path='/confirm-order' element={<AcceptOrder />} />
            <Route path='/vacancy' element={<OrganizationVacancy />} />
            <Route path='/vacancy/:id' element={<VacancyAd />} />
          </Route>
          <Route element={<NoAuthRoute />}>
            <Route path='/registration' element={<RegistrationPage />}></Route>
            <Route path='/authorization' element={<AuthorizationPage />}></Route>
          </Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
        {/* <Routes>
          <Route path='/company-information' element={<AdminOrganizationPage />} />
        </Routes> */}
      </div>
      <ModalContainer />
    </div>
  );
});

export default App;
