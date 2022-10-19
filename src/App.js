import React from 'react';

import { useRoutes } from 'react-router-dom';

import routes from './routes';

import { ReactQueryDevtools } from 'react-query/devtools';

import Modals from '@components/modals/modals.component';

import '@sass/App.sass';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
 const content = useRoutes(routes);

 return (
  <>
   {content}
   <Modals />
   <ToastContainer />
   <ReactQueryDevtools initialIsOpen={true} />
  </>
 );
};

export default App;
