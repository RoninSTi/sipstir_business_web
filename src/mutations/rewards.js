import clients from '@services/api';

export const create = async ({ data }) => {
 const response = await clients.default.client({
  method: 'post',
  url: 'reward',
  data,
 });

 return response;
};

export const update = async ({ data, rewardId }) => {
 const response = await clients.default.client({
  method: 'put',
  url: `reward/${rewardId}`,
  data,
 });

 return response;
};
