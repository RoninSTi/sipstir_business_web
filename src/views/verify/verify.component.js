import React from 'react';
import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import * as QueryString from 'query-string';

import { getVerifiedUser } from '@queries/auth';

const Verify = () => {
 const { search } = useLocation();

 const { otp } = QueryString.parse(search);

 const query = useQuery('verifiedUser', () => getVerifiedUser({ otp }));

 return (
  <section className="section">
   <div className="container">
    <h1 className="title">Thank you for verifying your email.</h1>

    {query.data?.setPassword ? <p>Set your password here</p> : <p>Continue to login</p>}
   </div>
  </section>
 );
};

export default Verify;
