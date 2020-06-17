import { CHECK_USERNAME, CREATE_USER, LOGIN } from '@actions/types'

export const checkUsernameAction = ({ username, token }) => ({
  type: CHECK_USERNAME,
  payload: {
    request: {
      method: 'get',
      url: `user/check/${username}`,
      headers: { Authorization: `Bearer ${token}` }
    }
  }
})

export const createUserAction = ({ avatar, email, username, token }) => ({
  type: CREATE_USER,
  payload: {
    request: {
      method: 'post',
      url: 'user',
      data: {
        avatar, email, username
      },
      headers: { Authorization: `Bearer ${token}` }
    }
  }
})

export const loginAction = ({ email, history, token }) => ({
  type: LOGIN,
  history,
  payload: {
    request: {
      method: 'post',
      url: 'auth/login',
      data: {
        email
      },
      headers: { Authorization: `Bearer ${token}` }
    }
  }
})
