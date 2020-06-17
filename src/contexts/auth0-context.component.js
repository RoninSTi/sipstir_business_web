import React, { Component, createContext, useContext } from 'react'

import { withRouter } from 'react-router-dom'
import createAuth0Client from '@auth0/auth0-spa-js'

import { SET_AUTH } from '@actions/types'
import { connect } from 'react-redux'

export const Auth0Context = createContext()

export const useAuth0 = () => useContext(Auth0Context)

class Auth0Provider extends Component {
  state = {
    auth0Client: null
  };

  config = {
    audience: process.env.REACT_APP_AUTH0_AUDIENCE,
    domain: process.env.REACT_APP_AUTH0_DOMAIN,
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    redirect_uri: window.location.origin
  };

  handleRedirectCallback = async () => {
    this.setState({ isLoading: true })

    try {
      await this.state.auth0Client.handleRedirectCallback()

      const isAuthenticated = await this.state.auth0Client.isAuthenticated()
      const user = isAuthenticated ? await this.state.auth0Client.getUser() : null
      const token = isAuthenticated ? await this.state.auth0Client.getTokenSilently() : null

      this.props.dispatch({
        type: SET_AUTH,
        payload: {
          isAuthenticated,
          isLoading: false,
          history: this.props.history,
          token,
          user
        }
      })

      window.history.replaceState({}, document.title, window.location.pathname)
    } catch (error) {
      console.log({ error })
    }
  };

  // initialize the auth0 library
  initializeAuth0 = async () => {
    try {
      const auth0Client = await createAuth0Client(this.config)
      this.setState({ auth0Client })
    } catch (error) {
      console.log({ error })
    }

    // check to see if they have been redirected after login
    if (window.location.search.includes('code=')) {
      return this.handleRedirectCallback()
    }

    const isAuthenticated = await this.state.auth0Client.isAuthenticated()
    const user = isAuthenticated ? await this.state.auth0Client.getUser() : null
    const token = isAuthenticated ? await this.state.auth0Client.getTokenSilently() : null

    this.props.dispatch({
      type: SET_AUTH,
      payload: {
        isAuthenticated,
        isLoading: false,
        history: this.props.history,
        token,
        user
      }
    })
  };

  componentDidMount() {
    this.initializeAuth0()
  }


  render() {
    const { auth0Client } = this.state
    const { children } = this.props

    const configObject = {
      getTokenSilently: (...p) => auth0Client.getTokenSilently(...p),
      getIdTokenClaims: (...p) => auth0Client.getIdTokenClaims(...p),
      loginWithRedirect: (...p) => auth0Client.loginWithRedirect(...p),
      logout: (...p) => auth0Client.logout(...p)
    }

    return (
      <Auth0Context.Provider value={configObject}>
        {children}
      </Auth0Context.Provider>
    )
  }
}

export default withRouter(connect()(Auth0Provider))
