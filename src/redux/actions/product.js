import { CREATE_SUBSCRIPTION, FETCH_PRODUCTS } from '@actions/types'

export const createSubscriptionAction = ({ customerId, paymentMethodId, priceId, token }) => ({
  type: CREATE_SUBSCRIPTION,
  payload: {
    request: {
      method: 'post',
      url: 'subscription',
      data: {
        customerId,
        paymentMethodId,
        priceId
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
})

export const getProductsAction = ({ token }) => ({
  type: FETCH_PRODUCTS,
  payload: {
    request: {
      method: 'get',
      url: 'products',
      headers: { Authorization: `Bearer ${token}` }
    }
  }
})
