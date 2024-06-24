// 로그인된 사람이 로그인 페이지나 회원가입 페이지에 들어가면 메인페이지로 리디렉션
import {Outlet, Navigate} from 'react-router-dom'
import PropTypes from 'prop-types';

const NotAuthRoutes = ({isAuth}) => {
  return (
    isAuth ? <Navigate to={'/'} /> : <Outlet />
  )
}
NotAuthRoutes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};
export default NotAuthRoutes