import { Navigate, Outlet } from 'react-router-dom';

import { userStore } from '../../store';

const AuthRoute = () => {
  return userStore.isAuth ? <Outlet /> : <Navigate to='/authorization' />;
};

export default AuthRoute;
