import clients from '@services/api';

export const getMe = async () => {
 const response = await clients.default.client({
  method: 'get',
  url: 'user/me',
 });

 return response;
};
