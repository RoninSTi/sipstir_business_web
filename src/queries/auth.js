import clients from '@services/api';

const api = clients.default.client;

export const getVerifiedUser = async ({ otp }) => {
 const response = await api({
  method: 'get',
  url: 'verify',
  params: { otp },
 });

 return response.data;
};
