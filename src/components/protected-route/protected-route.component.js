import React from 'react'

import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ path, children }) => {
  const isValidated = useSelector(state => state.auth.isValidated)

  if (!isValidated) return <Redirect to='/login' />

  return <Route path={path}>{children}</Route>
}

export default ProtectedRoute
