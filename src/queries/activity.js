import clients from '@services/api';

const api = clients.default.client;

export const getActivity = async ({ accountId }) => {
 const response = await api({
  method: 'get',
  url: `activity/account/${accountId}`,
 });

 return response;
};
