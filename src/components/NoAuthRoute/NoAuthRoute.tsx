import { Navigate, Outlet } from 'react-router-dom';

import { userStore } from '../../store';

const NoAuthRoute = () => {
  return userStore.isAuth ? <Navigate to='/profile' /> : <Outlet />;
};

export default NoAuthRoute;
