import clients from '@services/api';

const api = clients.default.client;

export const getPaymentMethod = async ({ accountId }) => {
 const response = await api({
  method: 'get',
  url: `account/${accountId}/payment-method`,
 });

 return response;
};
