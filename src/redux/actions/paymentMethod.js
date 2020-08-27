import { FETCH_PAYMENT_METHOD } from '@actions/types'
import { UPDATE_PAYMENT_METHOD } from './types'

export const fetchPaymentMethodAction = ({ accountId, token }) => ({
  type: FETCH_PAYMENT_METHOD,
  payload: {
    request: {
      method: 'get',
      url: `account/${accountId}/payment-method`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    setLoading: {
      meta: null
    }
  }
})

export const updatePaymentMethodAction = ({ token, ...data }) => ({
  type: UPDATE_PAYMENT_METHOD,
  payload: {
    request: {
      method: 'post',
      url: 'paymentmethod',
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
