import React from 'react';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { Navigate, useLocation } from 'react-router-dom';
import * as QueryString from 'query-string';

import AuthBox from '@components/auth-box/auth-box.component';
import ResetPassword from '@components/reset-password/reset-password.component';

const Reset = () => {
 const [cookies] = useCookies(['logged_in']);

 const { search } = useLocation();

 const { otp } = QueryString.parse(search);

 if (cookies.logged_in) {
  return <Navigate to="/dashboard" />;
 }
 return (
  <AuthBox>
   <ResetPassword otp={otp} />
  </AuthBox>
 );
};

Reset.defaultProps = {
 otp: '',
};

Reset.propTypes = {
 otp: PropTypes.string,
};

export default Reset;
