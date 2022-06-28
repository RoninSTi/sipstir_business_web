import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { CLEAR_REDIRECT } from '@redux/actions/types';

import { Navigate, useLocation } from 'react-router-dom';

const AppRedirect = () => {
 const dispatch = useDispatch();

 const redirect = useSelector((state) => state.nav.redirect);

 const { pathname } = useLocation();

 const pathsMatch = pathname === redirect;

 useEffect(() => {
  if (pathsMatch) {
   dispatch({
    type: CLEAR_REDIRECT,
   });
  }
 }, [dispatch, pathsMatch]);

 return !pathsMatch && redirect ? <Navigate to={redirect} /> : null;
};

export default AppRedirect;
