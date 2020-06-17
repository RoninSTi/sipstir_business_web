import React from 'react'

import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ path, children }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  if (!isAuthenticated) return <Redirect to='/login' />

  return <Route path={path}>{children}</Route>
}

export default ProtectedRoute
