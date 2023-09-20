import React, { useEffect } from 'react';
import classnames from 'classnames';
import { useMutation } from 'react-query';
import { useGetAccounts } from '@hooks/queries';
import { update as updateFn } from '@mutations/account';
import { toast } from 'react-toastify';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';

import useStyles from './profile-box.style';

require('yup-phone');

const schema = yup.object().shape({
 email: yup.string().email().required(),
 phone: yup.string().phone().required(),
 url: yup.string().url().required(),
});

const ProfileBox = (props) => {
 const classes = useStyles(props);

 const getAccounts = useGetAccounts();

 const account = getAccounts.data?.[0];

 const { mutate: update, isLoading } = useMutation(
  (accountData) => updateFn({ data: accountData }),
  {
   onSuccess: () => {
    getAccounts.refetch();
    toast.success('Account updated');
   },
  },
 );

 const { register, handleSubmit, errors, setValue } = useForm({
  resolver: yupResolver(schema),
 });

 useEffect(() => {
  if (account) {
   Object.keys(account).forEach((key) => {
    setValue(key, account[key], {
     shouldValidate: true,
     shouldDirty: true,
    });
   });
  }
 }, [account, setValue]);

 const onSubmit = (data) => {
  let accountData = {
   ...data,
   id: account.id,
  };

  if (data.image === '') {
   accountData = {
    ...accountData,
    image: null,
   };
  }

  update(accountData);
 };

 return (
  <div className="container">
   <h5 className={classnames('title', 'is-5', classes.boxTitle)}>Profile</h5>
   <form onSubmit={handleSubmit(onSubmit)}>
    <div className="columns">
     <div className={classnames('column', 'is-one-half')}>
      <div className="field">
       <label className="label" htmlFor="phone-input">
        Phone
       </label>
       <div className="control">
        <input
         id="phone-input"
         ref={register}
         className="input"
         name="phone"
         placeholder="555-555-5555"
         type="phone"
        />
       </div>
       {errors.phone && <p className={classnames('help', 'is-danger')}>{errors.phone?.message}</p>}
      </div>
     </div>
     <div className={classnames('column', 'is-one-half')}>
      <div className="field">
       <label className="label" htmlFor="email-input">
        Email
       </label>
       <div className="control">
        <input
         id="email-input"
         ref={register}
         className="input"
         name="email"
         placeholder="e.g. awesome_business@aol.com"
         type="email"
        />
       </div>
       {errors.phone && <p className={classnames('help', 'is-danger')}>{errors.phone?.message}</p>}
      </div>
     </div>
    </div>
    <div className="columns">
     <div className="column">
      <div className="field">
       <label className="label" htmlFor="url-input">
        Business URL
       </label>
       <div className="control">
        <input
         id="url-input"
         ref={register}
         className="input"
         name="url"
         placeholder="drinkourbooze.com"
         type="text"
        />
       </div>
       {errors.url && <p className={classnames('help', 'is-danger')}>{errors.url?.message}</p>}
      </div>
     </div>
    </div>
    <button className={classnames('button', 'is-info', { 'is-loading': isLoading })} type="submit">
     Update Profile
    </button>
   </form>
  </div>
 );
};

export default ProfileBox;
