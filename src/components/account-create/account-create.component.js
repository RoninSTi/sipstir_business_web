import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { CREATE_ACCOUNT, UPDATE_ACCOUNT } from '@actions/types';
import { createAccountAction } from '@actions/account';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import 'yup-phone-lite';

import { Link } from 'react-router-dom';

import GooglePlaceSelect from '@components/google-place-select/google-place-select.component';
import PageHeader from '@components/page-header/page-header.component';

const schema = yup.object().shape({
 name: yup.string().required(),
 email: yup.string().email().required(),
 placeId: yup.string().required(),
 contactName: yup.string().required(),
 phone: yup.string().phone().required(),
 url: yup.string().url().required(),
});

const AccountCreate = () => {
 const dispatch = useDispatch();

 const { register, handleSubmit, errors, setValue } = useForm({
  resolver: yupResolver(schema),
 });

 const isLoading = useSelector((state) =>
  state.ui.isLoading.some(
   (item) => item.loadingType === CREATE_ACCOUNT || item.loadingType === UPDATE_ACCOUNT,
  ),
 );

 const handleOnSelectSuggest = ({ value }) => {
  setValue('placeId', value, {
   shouldValidate: true,
   shouldDirty: true,
  });
 };

 const onSubmit = (data) => {
  dispatch(createAccountAction({ data }));
 };

 return (
  <div>
   <PageHeader title="Create your account" />
   <div className="box">
    <form onSubmit={handleSubmit(onSubmit)}>
     <div className="field">
      <label className="label" htmlFor="account-name-input">
       Account Name
      </label>
      <div className="control">
       <input
        id="account-name-input"
        ref={register}
        className="input"
        name="name"
        placeholder="Popular watering hole"
        type="text"
       />
      </div>
      {errors.name && <p className="help is-danger">{errors.name?.message}</p>}
     </div>
     <div className="field">
      <label className="label" htmlFor="account-email-input">
       Primary Email
      </label>
      <div className="control">
       <input
        id="account-email-input"
        ref={register}
        className="input"
        name="email"
        placeholder="popular_watering_hole@aol.com"
        type="email"
       />
      </div>
      {errors.email && <p className="help is-danger">{errors.email?.message}</p>}
     </div>
     <div className="field">
      <label className="label" htmlFor="account-google-place-input">
       Find your Google Place listing
      </label>
      <div className="control">
       <GooglePlaceSelect onSelectSuggest={handleOnSelectSuggest} />
      </div>
      {errors.placeId && <p className="help is-danger">{errors.placeId?.message}</p>}
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
        placeholder="Joey Businessowner"
        type="text"
       />
      </div>
      {errors.contactName && <p className="help is-danger">{errors.contactName?.message}</p>}
     </div>
     <div className="field">
      <label className="label" htmlFor="account-phone-input">
       Billing Phone Number
      </label>
      <div className="control">
       <input
        id="account-phone-input"
        ref={register}
        className="input"
        name="phone"
        placeholder="555-555-5555"
        type="phone"
       />
      </div>
      {errors.phone && <p className="help is-danger">{errors.phone?.message}</p>}
     </div>
     <div className="field">
      <label className="label" htmlFor="account-url-input">
       Business URL
      </label>
      <div className="control">
       <input
        id="account-url-input"
        ref={register}
        className="input"
        name="url"
        placeholder="https://popularwateringhole.com"
        type="text"
       />
      </div>
      {errors.url && <p className="help is-danger">{errors.url?.message}</p>}
     </div>
     <div className="field">
      <div className="buttons">
       <Link className="button" to="/">
        Cancel
       </Link>
       <button className={`button is-info${isLoading ? ' is-loading' : ''}`} type="submit">
        Create Account
       </button>
      </div>
     </div>
    </form>
   </div>
  </div>
 );
};

export default AccountCreate;
