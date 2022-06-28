import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getUserAccountsAction } from '@actions/account';

import AccountInfo from '@components/account-info/account-info.component';

const Accounts = () => {
 const dispatch = useDispatch();

 const userId = useSelector((state) => state.auth.user?.id);
 const token = useSelector((state) => state.auth.token);
 const isEmployee = useSelector((state) =>
  state.auth.user?.roles.some((role) => role === 'employee'),
 );

 useEffect(() => {
  if (!isEmployee && userId && token) {
   dispatch(getUserAccountsAction({ userId, token }));
  }
 }, [dispatch, isEmployee, userId, token]);

 return (
  <div>
   <AccountInfo />
  </div>
 );
};

export default Accounts;
