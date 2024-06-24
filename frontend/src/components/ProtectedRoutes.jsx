// 비로그인 회원이 로그인해야지만 갈 수 있는 페이지에 갈 수 없게 함

import {Outlet, Navigate} from 'react-router-dom'
import PropTypes from 'prop-types';

const ProtectedRoutes = ({isAuth}) => {
  return (
    isAuth ? <Outlet /> : <Navigate to={'/login'} />
  )
}
ProtectedRoutes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

export default ProtectedRoutes