import { Navigate, Outlet } from 'react-router-dom';

import { userStore } from '../../store';

const AuthRoute = () => {
  return userStore.isAuth ? <Navigate to='/profile' /> : <Outlet />;
};

export default AuthRoute;
