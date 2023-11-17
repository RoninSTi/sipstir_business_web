import { useQuery } from 'react-query';
import { getMe } from '@queries/user';
import { getAccounts, getRewards } from '@queries/account';
import { getPaymentMethod } from '@queries/payment-method';
import { getSubscription } from '@queries/subscription';
import queries from '@queries/query-types';
import { getProducts } from '@queries/products';
import { getActivity } from '@queries/activity';

export const useGetAccounts = () => {
 return useQuery(queries.account.account, getAccounts, {
  select: (response) => response.data?.[0],
 });
};

export const useGetActivity = ({ accountId }) => {
 return useQuery(queries.account.activity, () => getActivity({ accountId }), {
  select: (response) => response.data,
  enabled: !!accountId,
 });
};

export const useGetMe = () => {
 return useQuery(queries.user.me, getMe, {
  enabled: false,
  select: (response) => response.data,
 });
};

export const useGetPaymentMethod = ({ accountId }) => {
 return useQuery(queries.account.paymentMethod, () => getPaymentMethod({ accountId }), {
  select: (response) => response.data,
  enabled: !!accountId,
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

export const useGetSubscription = ({ accountId }) => {
 return useQuery([queries.account.subscription, accountId], () => getSubscription({ accountId }), {
  select: (response) => response.data,
  enabled: !!accountId,
 });
};
