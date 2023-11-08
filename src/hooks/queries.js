import { useQuery } from 'react-query';
import { getMe } from '@queries/user';
import { getAccounts, getRewards } from '@queries/account';
import queries from '@queries/query-types';
import { getProducts } from '@queries/products';

export const useGetAccounts = () => {
 return useQuery(queries.account.account, getAccounts, {
  select: (response) => response.data,
 });
};

export const useGetMe = () => {
 return useQuery(queries.user.me, getMe, {
  enabled: false,
  select: (response) => response.data,
 });
};

export const useGetProducts = () => {
 return useQuery(queries.product.products, getProducts, {
  select: (response) => response.data,
 });
};

export const useGetRewards = ({ accountId }) => {
 return useQuery([queries.account.rewards, accountId], () => getRewards({ accountId }), {
  select: (response) => response.data,
  enabled: !!accountId,
 });
};
