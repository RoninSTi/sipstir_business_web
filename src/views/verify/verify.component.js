import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useQuery } from 'react-query';
import { getVerifiedUser } from '@queries/auth';
import { useLocation } from 'react-router-dom';
import * as QueryString from 'query-string';

import AuthBox from '@components/auth-box/auth-box.component';
import ResetPassword from '@components/reset-password/reset-password.component';

const Verify = () => {
 const [cookies] = useCookies(['logged_in']);

 const { search } = useLocation();

 const { otp } = QueryString.parse(search);

 const query = useQuery('verifiedUser', () => getVerifiedUser({ otp }));

 if (cookies.logged_in) {
  return <Navigate to="/dashboard" />;
 }

 return (
  <AuthBox>
   <>
    <h1 className="title">Thank you for verifying your email.</h1>
    {query.data?.setPassword ? (
     <ResetPassword otp={otp} />
    ) : (
     <Link className="has-text-primary" to="/">
      Sign In
     </Link>
    )}
   </>
  </AuthBox>
 );
};

export default Verify;
