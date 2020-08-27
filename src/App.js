import React from 'react'

import { Provider } from 'react-redux'
import store from '@redux/store'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import AppRedirect from '@components/app-redirect/app-redirect.component'
import ProtectedRoute from '@components/protected-route/protected-route.component'

import Dashboard from '@views/dashboard/dashboard.component'
import Login from '@views/login/login.component'
import Modals from '@components/modals/modals.component'

import '@sass/App.sass'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)

const App = () => {
  return (
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <Router>
          <AppRedirect />
          <Switch>
            <Route path='/login'>
              <Login />
            </Route>
            <ProtectedRoute path='/'>
              <Dashboard />
            </ProtectedRoute>
          </Switch>
          <Modals />
        </Router>
      </Elements>
    </Provider>
  )
}

export default App
