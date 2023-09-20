import clients from '@services/api';

export const getAccounts = async () => {
 const response = await clients.default.client({
  method: 'get',
  url: `accounts`,
 });

 return response;
};

export const getRewards = async ({ accountId }) => {
 const response = await clients.default.client({
  method: 'get',
  url: `account/${accountId}/rewards`,
 });

 return response;
};

export const getSubscription = async ({ accountId }) => {
 const response = await clients.default.client({
  method: 'get',
  url: `account/${accountId}/subscription`,
 });

 return response;
};
