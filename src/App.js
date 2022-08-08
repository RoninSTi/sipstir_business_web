// import React from 'react';

import { useRoutes } from 'react-router-dom';

import routes from './routes';

// import { ToastContainer } from 'react-toastify';

// import { ReactQueryDevtools } from 'react-query/devtools';

// import Auth from '@views/auth/auth.component';
// import AuthUserRequired from './components/auth-user-required/auth-user-required.component';
// import Create from '@views/create/create.component';
// import Dashboard from '@views/dashboard/dashboard.component';
// import Login from '@views/login/login.component';
// import Verify from '@views/verify/verify.component';
// import Modals from '@components/modals/modals.component';

import '@sass/App.sass';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
 const content = useRoutes(routes);
 return content;
 //  <Modals />
 //  <ToastContainer />
 //  <ReactQueryDevtools initialIsOpen={true} />
};

export default App;
