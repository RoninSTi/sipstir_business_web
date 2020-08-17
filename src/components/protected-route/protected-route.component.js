import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import { SET_REDIRECT } from '@redux/actions/types'

const ProtectedRoute = ({ path, children }) => {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user)

  useEffect(() => {
    if (!user) {
      dispatch({ type: SET_REDIRECT, payload: '/login' })
    }
  })

  return <Route path={path}>{children}</Route>
}

export default ProtectedRoute
