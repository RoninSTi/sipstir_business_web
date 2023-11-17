import { CREATE_SUBSCRIPTION, FETCH_PRODUCTS } from '@actions/types';

export const createSubscriptionAction = (data) => ({
 type: CREATE_SUBSCRIPTION,
 payload: {
  request: {
   method: 'post',
   url: 'subscription',
   data,
  },
  setLoading: {
   meta: null,
  },
 },
});

export const getProductsAction = () => ({
 type: FETCH_PRODUCTS,
 payload: {
  request: {
   method: 'get',
   url: 'products',
  },
 },
});
