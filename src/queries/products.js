import clients from '@services/api';

const api = clients.default.client;

export const getProducts = async () => {
 const response = await api({
  method: 'get',
  url: 'products',
 });

 return response;
};
