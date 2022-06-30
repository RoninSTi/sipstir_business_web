import { CANCEL_SUBSCRIPTION, FETCH_SUBSCRIPTION } from './types';

export const cancelSubscriptionAction = ({ subscriptionId, token }) => ({
 type: CANCEL_SUBSCRIPTION,
 payload: {
  request: {
   method: 'delete',
   url: `subscription/${subscriptionId}`,
   headers: {
    Authorization: `Bearer ${token}`,
   },
  },
  setLoading: {
   meta: null,
  },
 },
});

export const fetchSubscriptionAction = ({ accountId, token }) => ({
 type: FETCH_SUBSCRIPTION,
 payload: {
  request: {
   method: 'get',
   url: `account/${accountId}/subscription`,
   headers: {
    Authorization: `Bearer ${token}`,
   },
  },
  setLoading: {
   meta: null,
  },
 },
});
