import React from 'react';

import { Provider } from 'react-redux';
import store from '@redux/store';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { ToastContainer } from 'react-toastify';

import { QueryClient, QueryClientProvider } from 'react-query';

import AppRedirect from '@components/app-redirect/app-redirect.component';
import ProtectedRoute from '@components/protected-route/protected-route.component';

import Create from '@views/create/create.component';
import Dashboard from '@views/dashboard/dashboard.component';
import Login from '@views/login/login.component';
import Verify from '@views/verify/verify.component';
import Modals from '@components/modals/modals.component';

import '@sass/App.sass';
import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const queryClient = new QueryClient();

const App = () => {
 return (
  <Provider store={store}>
   <Elements stripe={stripePromise}>
    <QueryClientProvider client={queryClient}>
     <Router>
      <AppRedirect />
      <Switch>
       <Route exact path="/login">
        <Login />
       </Route>
       <Route exact path="/create">
        <Create />
       </Route>
       <Route exact path="/verify">
        <Verify />
       </Route>
       <ProtectedRoute exact path="/">
        <Dashboard />
       </ProtectedRoute>
      </Switch>
      <Modals />
     </Router>
     <ToastContainer />
    </QueryClientProvider>
   </Elements>
  </Provider>
 );
};

export default App;
