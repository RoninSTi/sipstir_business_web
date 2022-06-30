import clients from '@services/api';

export const createAccount = async ({ data }) => {
 const response = clients.default.client({
  method: 'post',
  url: 'account',
  data,
 });

 return response.data;
};

export const login = async ({ data }) => {
 const response = await clients.default.client({
  method: 'post',
  url: 'auth/login',
  data,
 });

 return response.data;
};

export const logout = async () => {
 const response = await clients.default.client({
  method: 'post',
  url: 'auth/logout',
 });

 return response;
};
