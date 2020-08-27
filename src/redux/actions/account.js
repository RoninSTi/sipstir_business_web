import {
  ADD_USER,
  CREATE_ACCOUNT,
  DELETE_BUSINESS,
  DELETE_USER,
  FETCH_ACCOUNT_ACTIVITY,
  FETCH_BUSINESSES,
  FETCH_USER_ACCOUNTS,
  UPDATE_ACCOUNT,
  UPDATE_USER
} from '@actions/types'

export const addUserAction = ({ accountId, token, ...data }) => ({
  type: ADD_USER,
  payload: {
    request: {
      method: 'post',
      url: `account/${accountId}/user/add`,
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    setLoading: {
      meta: null
    }
  }
})

export const createAccountAction = ({ token, ...data }) => ({
  type: CREATE_ACCOUNT,
  payload: {
    request: {
      method: 'post',
      url: 'account',
      data,
      headers: { Authorization: `Bearer ${token}` }
    },
    setLoading: {
      meta: null
    }
  }
})

export const deleteBusinessAction = ({ accountId, token }) => ({
  type: DELETE_BUSINESS,
  payload: {
    request: {
      method: 'delete',
      url: `account/${accountId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    setLoading: {
      meta: accountId
    }
  }
})

export const deleteUserAction = ({ accountId, userId, token }) => ({
  type: DELETE_USER,
  payload: {
    request: {
      method: 'delete',
      url: `account/${accountId}/user/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    setLoading: {
      meta: userId
    }
  }
})

export const fetchAccountActivityAction = ({ accountId, token }) => ({
  type: FETCH_ACCOUNT_ACTIVITY,
  payload: {
    request: {
      method: 'get',
      url: `activity/account/${accountId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    setLoading: {
      meta: null
    }
  }
})

export const getBusinessesAction = ({ token }) => ({
  type: FETCH_BUSINESSES,
  payload: {
    request: {
      method: 'get',
      url: 'accounts',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
})

export const getUserAccountsAction = ({ userId, token }) => ({
  type: FETCH_USER_ACCOUNTS,
  payload: {
    request: {
      method: 'get',
      url: `user/${userId}/accounts`,
      headers: { Authorization: `Bearer ${token}` }
    }
  }
})

export const updateAccountAction = ({ accountId, token, ...data }) => ({
  type: UPDATE_ACCOUNT,
  payload: {
    request: {
      method: 'put',
      url: `account/${accountId}`,
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
})

export const updateUserAction = ({ accountId, userId, token, ...data }) => ({
  type: UPDATE_USER,
  payload: {
    request: {
      method: 'put',
      url: `account/${accountId}/user/${userId}`,
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    setLoading: {
      meta: userId
    }
  }
})
