import clients from '@services/api';

export const createAccount = async ({ data }) => {
 clients.default.client({
  method: 'post',
  url: 'account',
  data,
 });
};

export const login = async ({ data }) => {
 clients.default.client({
  method: 'post',
  url: 'auth/login',
  data,
 });
};
