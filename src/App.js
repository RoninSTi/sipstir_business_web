import React from 'react';

import { useRoutes } from 'react-router-dom';

import routes from './routes';

import { ReactQueryDevtools } from 'react-query/devtools';

import Modals from '@components/modals/modals.component';

import '@sass/App.sass';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { useNavigate } from 'react-router-dom';

const App = () => {
 const content = useRoutes(routes);

 const navigate = useNavigate();

 const queryClient = new QueryClient({
  mutationCache: new MutationCache({
   onError: (error) => {
    if (error.response?.status === 401) {
     navigate('/');
    }

    if (Array.isArray(error.response.data.error)) {
     error.response.data.error.forEach((el) =>
      toast.error(el.message, {
       position: 'top-right',
      }),
     );
    } else {
     toast.error(error.response.data.message, {
      position: 'top-right',
     });
    }
   },
  }),
  queryCache: new QueryCache({
   onError: (error) => {
    if (error.response?.status === 401) {
     navigate('/');
    }

    if (Array.isArray(error.response.data.error)) {
     error.response.data.error.forEach((el) =>
      toast.error(el.message, {
       position: 'top-right',
      }),
     );
    } else {
     toast.error(error.response.data.message, {
      position: 'top-right',
     });
    }
   },
  }),
 });

 return (
  <QueryClientProvider client={queryClient}>
   {content}
   <Modals />
   <ToastContainer />
   <ReactQueryDevtools initialIsOpen={true} />
  </QueryClientProvider>
 );
};

export default App;
