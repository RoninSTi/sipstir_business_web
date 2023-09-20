import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

import { Link, useNavigate, useParams } from 'react-router-dom';

import PageHeader from '@components/page-header/page-header.component';
import { create as createFn, update as updateFn } from '@mutations/rewards';
import { toast } from 'react-toastify';
import { useGetAccounts, useGetRewards } from '@hooks/queries';
import { useMutation } from 'react-query';

const schema = yup.object().shape({
 isActive: yup.boolean().required(),
 message: yup.string().required(),
 points: yup.number().required(),
 title: yup.string().required(),
});

const RewardCreate = () => {
 const { rewardId } = useParams();

 const navigate = useNavigate();

 const getAccounts = useGetAccounts();

 const accountId = getAccounts.data?.[0]?.id;

 const getRewards = useGetRewards({ accountId });

 const { mutate: create, isLoading: isLoadingCreate } = useMutation(
  (rewardData) => createFn({ data: rewardData }),
  {
   onSuccess: () => {
    getRewards.refetch();
    toast.success('Reward created');
    navigate('/dashboard/rewards');
   },
  },
 );

 const { mutate: update, isLoading: isLoadingUpdate } = useMutation(
  (rewardData) => updateFn({ data: rewardData, rewardId }),
  {
   onSuccess: () => {
    getRewards.refetch();
    toast.success('Reward updated');
    navigate('/dashboard/rewards');
   },
  },
 );

 const isLoading = isLoadingCreate || isLoadingUpdate;

 const { register, handleSubmit, errors, setValue } = useForm({
  resolver: yupResolver(schema),
 });

 const reward = getRewards.data?.find((rwd) => rwd.id === parseInt(rewardId, 10));

 useEffect(() => {
  if (reward) {
   Object.keys(reward).forEach((key) => {
    setValue(key, reward[key], {
     shouldValidate: true,
     shouldDirty: true,
    });
   });
  }
 }, [reward, setValue]);

 const onSubmit = (data) => {
  if (!accountId) return;

  const rewardData = {
   ...data,
   accountId,
  };

  reward ? update(rewardData) : create(rewardData);
 };

 return (
  <div>
   <PageHeader title={`${reward ? 'Update' : 'Add'} New Reward`} />
   <div className="box">
    <form onSubmit={handleSubmit(onSubmit)}>
     <div className="field">
      <label className="label" htmlFor="title-input">
       Title
      </label>
      <div className="control">
       <input
        id="title-input"
        ref={register}
        className="input"
        name="title"
        placeholder="10% off your next bill"
        type="text"
       />
      </div>
      {errors.title && <p className="help is-danger">{errors.title?.message}</p>}
     </div>
     <div className="field">
      <label className="label" htmlFor="message-input">
       Message
      </label>
      <div className="control">
       <input
        id="title-input"
        ref={register}
        className="input"
        name="message"
        placeholder="Offer for a limited time only!"
        type="text"
       />
      </div>
      {errors.message && <p className="help is-danger">{errors.message?.message}</p>}
     </div>
     <div className="field">
      <label className="label" htmlFor="points-input">
       Points
      </label>
      <div className="control">
       <input
        id="points-input"
        ref={register}
        className="input"
        defaultValue={100}
        name="points"
        type="number"
       />
      </div>
      {errors.points && <p className="help is-danger">{errors.points?.message}</p>}
     </div>
     <div className="field">
      <label className="checkbox">
       <input ref={register} className="mr-2" defaultValue name="isActive" type="checkbox" />
       Activate
      </label>
      {errors.isActive && <p className="help is-danger">{errors.isActive?.message}</p>}
     </div>
     <div className="field">
      <div className="buttons mt-2">
       <Link className="button" to="/dashboard/rewards">
        Cancel
       </Link>
       <button className={`button is-info${isLoading ? ' is-loading' : ''}`} type="submit">
        Submit
       </button>
      </div>
     </div>
    </form>
   </div>
  </div>
 );
};

export default RewardCreate;
