import { CREATE_SUBSCRIPTION, FETCH_PRODUCTS } from '@actions/types';

export const createSubscriptionAction = ({ token, ...data }) => ({
 type: CREATE_SUBSCRIPTION,
 payload: {
  request: {
   method: 'post',
   url: 'subscription',
   data,
   headers: {
    Authorization: `Bearer ${token}`,
   },
  },
  setLoading: {
   meta: null,
  },
 },
});

export const getProductsAction = ({ token }) => ({
 type: FETCH_PRODUCTS,
 payload: {
  request: {
   method: 'get',
   url: 'products',
   headers: { Authorization: `Bearer ${token}` },
  },
 },
});
