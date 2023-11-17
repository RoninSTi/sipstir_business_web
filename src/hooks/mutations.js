import { useMutation, useQueryClient } from 'react-query';
import {
 create as createReward,
 destroy as destroyReward,
 update as updateReward,
} from '../mutations/rewards';
import {
 create as createSubscription,
 destroy as destroySubscription,
} from '@mutations/subscription';
import queries from '@queries/query-types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CLEAR_MODAL } from '@redux/actions/types';

export const useCreateReward = () => {
 const navigate = useNavigate();

 const queryClient = useQueryClient();

 return useMutation((rewardData) => createReward({ data: rewardData }), {
  onSuccess: () => {
   queryClient.invalidateQueries({
    queryKey: [queries.account.rewards],
   });
   toast.success('Reward created');
   navigate('/dashboard/rewards');
  },
 });
};

export const useCreateSubscription = () => {
 const dispatch = useDispatch();

 const queryClient = useQueryClient();

 return useMutation(({ data }) => createSubscription({ data }), {
  onSuccess: () => {
   queryClient.invalidateQueries({
    queryKey: [queries.account.account],
   });
   toast.success('Subscription plan active!');
   dispatch({ type: CLEAR_MODAL });
  },
 });
};

export const useDestroySubscription = () => {
 const queryClient = useQueryClient();

 return useMutation(({ subscriptionId }) => destroySubscription({ subscriptionId }), {
  onSuccess: () => {
   queryClient.invalidateQueries({
    queryKey: [queries.account.account],
   });
  },
 });
};

export const useDestroyReward = () => {
 const queryClient = useQueryClient();

 return useMutation(({ rewardId }) => destroyReward({ rewardId }), {
  onSuccess: () => {
   queryClient.invalidateQueries({
    queryKey: [queries.account.rewards],
   });
   toast.success('Reward deleted');
  },
 });
};

export const useUpdateReward = () => {
 const navigate = useNavigate();

 const queryClient = useQueryClient();

 return useMutation(({ data, rewardId }) => updateReward({ data, rewardId }), {
  onSuccess: () => {
   queryClient.invalidateQueries({
    queryKey: [queries.account.rewards],
   });
   toast.success('Reward updated');
   navigate('/dashboard/rewards');
  },
 });
};
