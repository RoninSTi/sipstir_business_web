import React from 'react';
import Auth from '@views/auth/auth.component';
import Create from '@views/create/create.component';
import Dashboard from '@views/dashboard/dashboard.component';
import Forgot from '@views/forgot/forgot.component';
import Login from '@views/login/login.component';
import Reset from '@views/reset/reset.component';
import Verify from '@views/verify/verify.component';

import AccountOverview from '@components/account-overview/account-overview.component';
import MyAccount from '@components/my-account/my-account.component';
import Rewards from '@components/rewards/rewards.component';
import RewardCreate from '@components/reward-create/reward-create.component';

const NoMatch = () => <div>No Route</div>;

const routes = [
 {
  path: '/',
  element: <Login />,
 },
 {
  path: '/auth',
  element: <Auth />,
 },
 {
  path: '/create',
  element: <Create />,
 },
 {
  path: '/dashboard',
  exact: true,
  element: <Dashboard />,
  children: [
   {
    path: '',
    element: <AccountOverview />,
   },
   {
    path: 'account',
    element: <MyAccount />,
   },
   {
    path: 'rewards',
    element: <Rewards />,
   },
   {
    path: 'rewards/create',
    exact: true,
    element: <RewardCreate />,
   },
   {
    path: 'rewards/:rewardId',
    exact: true,
    element: <RewardCreate />,
   },
  ],
 },
 {
  path: '/forgot',
  element: <Forgot />,
 },
 {
  path: '/reset',
  element: <Reset />,
 },
 {
  path: '/verify',
  element: <Verify />,
 },
 { path: '*', element: <NoMatch /> },
];

export default routes;
