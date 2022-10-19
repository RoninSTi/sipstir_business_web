import React from 'react';
import Auth from '@views/auth/auth.component';
import Create from '@views/create/create.component';
import Dashboard from '@views/dashboard/dashboard.component';
import Forgot from '@views/forgot/forgot.component';
import Login from '@views/login/login.component';
import Reset from '@views/reset/reset.component';
import Verify from '@views/verify/verify.component';

// import AccountCreate from '@components/account-create/account-create.component';
// import AccountOverview from '@components/account-overview/account-overview.component';
// import Accounts from '@components/accounts/accounts.component';
// import Businesses from '@components/businesses/businesses.component';
// import MyAccount from '@components/my-account/my-account.component';
// import Rewards from '@components/rewards/rewards.component';
// import RewardCreate from '@components/reward-create/reward-create.component';

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
  element: <Dashboard />,
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

{
 /* <Routes>
<Route exact path="/auth" element={<Auth />} />
<Route exact path="/login" element={<Login />} />
<Route exact path="/create" element={<Create />} />

<Route
 path="/"
 element={
  <AuthUserRequired>
   <Dashboard />
  </AuthUserRequired>
 }
/>
</Routes> */
}

{
 /* <Routes>
<Route index element={isEmployee ? <Businesses /> : <AccountOverview />} />
<Route path="rewards" element={<Rewards />} />
<Route path="accounts/create" element={<AccountCreate />} />
<Route path="accounts/:accountId" element={<AccountCreate />} />={' '}
<Route path="accounts" element={<Accounts />} />
<Route path="my-account" element={<MyAccount />} />
<Route path="rewards/create" element={<RewardCreate />} />
<Route path="rewards/:rewardId" element={<RewardCreate />} />
</Routes> */
}
