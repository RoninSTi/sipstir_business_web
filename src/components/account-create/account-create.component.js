import React from 'react';
import classnames from 'classnames';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import 'yup-phone-lite';

import LOGO_TEXT from '../../assets/images/logo_text@3x.png';

import { useMutation } from 'react-query';
import { create as createFn } from '@mutations/account';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

import GooglePlaceSelect from '@components/google-place-select/google-place-select.component';
import useStyles from './account-create.styles';

const schema = yup.object().shape({
 name: yup.string().required(),
 email: yup.string().email().required(),
 placeId: yup.string().required(),
 contactName: yup.string().required(),
 phone: yup.string().phone().required(),
 url: yup.string().url().required(),
 password: yup.string().required(),
});

const AccountCreate = () => {
 const navigate = useNavigate();

 const classes = useStyles();

 const { register, handleSubmit, errors, setValue } = useForm({
  resolver: yupResolver(schema),
 });

 const { mutate: create, isLoading } = useMutation((accountData) => createFn(accountData), {
  onSuccess: () => {
   toast.success('You successfully created your account.  Check your email to verify and login.');
   navigate('/');
  },
 });

 const onSubmit = async (data) => {
  await create({ data });
 };

 const handleOnSelectSuggest = ({ value }) => {
  setValue('placeId', value, {
   shouldValidate: true,
   shouldDirty: true,
  });
 };

 return (
  <div className="box">
   <figure className={classes.logo}>
    <img src={LOGO_TEXT} alt="logo" />
   </figure>
   <form onSubmit={handleSubmit(onSubmit)}>
    <div className="field">
     <label className="label" htmlFor="account-name-input">
      Business Name
     </label>
     <div className="control">
      <input id="account-name-input" ref={register} className="input" name="name" type="text" />
     </div>
     {errors.name && <p className={classnames('help', 'is-danger')}>{errors.name?.message}</p>}
    </div>
    <div className="field">
     <label className="label" htmlFor="account-email-input">
      Primary Email
     </label>
     <div className="control">
      <input id="account-email-input" ref={register} className="input" name="email" type="email" />
     </div>
     {errors.email && <p className={classnames('help', 'is-danger')}>{errors.email?.message}</p>}
    </div>
    <div className="field">
     <label className="label" htmlFor="account-password-input">
      Password
     </label>
     <div className="control">
      <input
       id="account-password-input"
       ref={register}
       className="input"
       name="password"
       type="password"
      />
     </div>
     {errors.email && <p className={classnames('help', 'is-danger')}>{errors.email?.message}</p>}
    </div>
    <div className="field">
     <label className="label" htmlFor="account-google-place-input">
      Find your Google Place listing
     </label>
     <div className="control">
      <GooglePlaceSelect onSelectSuggest={handleOnSelectSuggest} />
     </div>
     {errors.placeId && (
      <p className={classnames('help', 'is-danger')}>{errors.placeId?.message}</p>
     )}
    </div>
    <input ref={register} name="placeId" type="hidden" />
    <div className="field">
     <label className="label" htmlFor="account-owner-input">
      Account Owner Name
     </label>
     <div className="control">
      <input
       id="account-owner-input"
       ref={register}
       className="input"
       name="contactName"
       type="text"
      />
     </div>
     {errors.contactName && (
      <p className={classnames('help', 'is-danger')}>{errors.contactName?.message}</p>
     )}
    </div>
    <div className="field">
     <label className="label" htmlFor="account-phone-input">
      Billing Phone Number
     </label>
     <div className="control">
      <input id="account-phone-input" ref={register} className="input" name="phone" type="phone" />
     </div>
     {errors.phone && <p className={classnames('help', 'is-danger')}>{errors.phone?.message}</p>}
    </div>
    <div className="field">
     <label className="label" htmlFor="account-url-input">
      Business URL
     </label>
     <div className="control">
      <input id="account-url-input" ref={register} className="input" name="url" type="text" />
     </div>
     {errors.url && <p className={classnames('help', 'is-danger')}>{errors.url?.message}</p>}
    </div>
    <button
     className={classnames('button', 'is-primary', 'is-fullwidth', 'mt-4', {
      'is-loading': isLoading,
     })}
     type="submit"
    >
     Create Account
    </button>
   </form>
   <div className={classnames('has-text-centered', 'mt-4', 'has-text-weight-medium')}>
    Any questions?{' '}
    <Link className="has-text-primary" to="/contact">
     Contact Us
    </Link>
   </div>
  </div>
 );
};

export default AccountCreate;
