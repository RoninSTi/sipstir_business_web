import clients from '@services/api';

export const create = async ({ data }) => {
 const response = await clients.default.client({
  method: 'post',
  url: 'subscription',
  data,
 });

 return response;
};

export const destroy = async ({ subscriptionId }) => {
 const response = await clients.default.client({
  method: 'delete',
  url: `subscription/${subscriptionId}`,
 });

 return response;
};
