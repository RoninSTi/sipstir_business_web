import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux';
import store from '@redux/store';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const queryClient = new QueryClient();

ReactDOM.render(
 <React.StrictMode>
  <Provider store={store}>
   <Elements stripe={stripePromise}>
    <QueryClientProvider client={queryClient}>
     <Router>
      <App />
     </Router>
    </QueryClientProvider>
   </Elements>
  </Provider>
 </React.StrictMode>,
 document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
