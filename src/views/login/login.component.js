import React from 'react'

import { Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { useAuth0 } from '@contexts/auth0-context.component'

const Login = () => {
  const auth0 = useAuth0()
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

  if (isAuthenticated) return <Redirect to='/' />

  return (
    <section className='hero is-primary is-fullheight'>
      <div className='hero-body'>
        <div className='container'>
          <div className='columns is-centered'>
            <div className='column is-5-tablet is-4-desktop is-3-widescreen'>
              <div
                action=''
                className='box'
              >
                <div className='field'>
                  <button
                    className='button is-success'
                    onClick={auth0.loginWithRedirect}
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
