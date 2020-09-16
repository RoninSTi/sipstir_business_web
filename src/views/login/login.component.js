import React, { useEffect } from 'react'

import { useLocation } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { loginAction } from '@actions/auth'

import * as QueryString from 'query-string'

import useStyles from './login.style'

import NAV_LOGO from '../../assets/images/sipstir_nav_logo.png'
import { LOGIN, SET_REDIRECT } from '@redux/actions/types'

const Login = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const { search } = useLocation()

  const params = QueryString.parse(search)

  const user = useSelector(state => state.auth.user)

  const isLoading = useSelector(state => state.ui.isLoading.some(element => element.loadingType === LOGIN))

  useEffect(() => {
    const { code, state } = params

    if (code && state && !user && !isLoading) {
      dispatch(loginAction({ code, state }))
    }
  }, [dispatch, isLoading, params, user])

  useEffect(() => {
    if (user) {
      dispatch({ type: SET_REDIRECT, payload: '/' })
    }
  }, [dispatch, user])

  return (
    <section className='hero is-primary is-fullheight'>
      <div className='hero-body'>
        <div className='container'>
          <div className='columns is-centered'>
            <div className='column is-5-tablet is-4-desktop is-3-widescreen'>
              <div className={classes.loginContainer}>
                <div className={classes.logoContainer}>
                  <img
                    alt='logo'
                    className={classes.logo}
                    height={69}
                    src={NAV_LOGO}
                    width={84}
                  />
                  <div className={classes.titleContainer}>
                    <span className={classes.title}>SipStir</span>
                    <span className={classes.subtitle}>For Business</span>
                  </div>
                </div>
                <a
                  className={`button is-primary is-inverted has-text-weight-semibold ${classes.button}${isLoading ? ' is-loading' : ''}`}
                  href={`${process.env.REACT_APP_API_URL}/auth/swoop`}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  Business Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
