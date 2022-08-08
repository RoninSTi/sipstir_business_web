import clients from '@services/api';

export const create = async ({ data }) => {
 const response = await clients.default.client({
  method: 'post',
  url: 'account',
  data,
 });

 return response.data;
};
