import clients from '@services/api';

export const forgot = async ({ data }) => {
 const response = await clients.default.client({
  method: 'post',
  url: 'auth/forgot',
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

export const reset = async ({ data }) => {
 const response = await clients.default.client({
  method: 'post',
  url: 'auth/password/reset',
  data,
 });

 return response;
};
