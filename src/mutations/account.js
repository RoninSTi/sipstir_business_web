import clients from '@services/api';

export const create = async ({ data }) => {
 const response = await clients.default.client({
  method: 'post',
  url: 'account',
  data,
 });

 return response.data;
};

export const update = async ({ data }) => {
 const response = await clients.default.client({
  method: 'put',
  url: `account/${data.id}`,
  data,
 });

 return response.data;
};
