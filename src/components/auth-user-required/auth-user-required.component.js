import React from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { getMe } from '@queries/user';
import { useQuery } from 'react-query';
import { setUser } from '@slices/auth';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import FullscreenLoader from '@components/fullscreen-loader/fullscreen-loader.component';

const AuthUserRequired = ({ children }) => {
 const dispatch = useDispatch();

 const [cookies] = useCookies(['logged_in']);

 const { isLoading } = useQuery(['authUser'], () => getMe(), {
  enabled: !!cookies.logged_in,
  select: (response) => response.data,
  onSuccess: (data) => {
   dispatch(setUser(data));
  },
 });

 if (!cookies.logged_in) {
  return <Navigate to="/login" />;
 }

 if (cookies.logged_in && isLoading) {
  return <FullscreenLoader />;
 }

 return children;
};

AuthUserRequired.propTypes = {
 children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default AuthUserRequired;
