import { useQuery } from 'react-query';
import { getMe } from '@queries/user';
import { getAccounts, getRewards } from '@queries/account';
import queries from '@queries/query-types';

export const useGetAccounts = () => {
 return useQuery(queries.account.account, getAccounts, {
  select: (response) => response.data,
 });
};

export const useGetMe = () => {
 return useQuery(queries.user.me, getMe, {
  select: (response) => response.data,
  retry: 1,
 });
};

export const useGetRewards = ({ accountId }) => {
 return useQuery([queries.account.rewards, accountId], () => getRewards({ accountId }), {
  select: (response) => response.data,
  enabled: !!accountId,
 });
};
