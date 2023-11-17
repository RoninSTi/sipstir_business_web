import clients from '@services/api';

const api = clients.default.client;

export const getSubscription = async ({ accountId }) => {
 const response = await api({
  method: 'get',
  url: `account/${accountId}/subscription`,
 });

 return response;
};
