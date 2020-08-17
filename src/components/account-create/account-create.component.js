import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { CREATE_ACCOUNT } from '@actions/types'
import { createAccountAction } from '@actions/account'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

import GooglePlaceSelect from '@components/google-place-select/google-place-select.component'
import PageHeader from '@components/page-header/page-header.component'

require('yup-phone')

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  placeId: yup.string().required(),
  contactName: yup.string().required(),
  phone: yup.string().phone().required()
})

const AccountCreate = () => {
  const dispatch = useDispatch()

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema)
  })

  const isLoading = useSelector(state => state.ui.isLoading.some(item => item.loadingType === CREATE_ACCOUNT))

  const token = useSelector(state => state.auth.token)

  const handleOnSelectSuggest = ({ value }) => {
    setValue('placeId', value, {
      shouldValidate: true,
      shouldDirty: true
    })
  }

  const onSubmit = data => {
    dispatch(createAccountAction({ ...data, token }))
  }

  return (
    <div>
      <PageHeader title='Add New Business' />
      <div className='box'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='field'>
            <label className='label'>Name</label>
            <div className='control'>
              <input
                ref={register}
                className='input'
                name='name'
                placeholder='Account name'
                type='text'
              />
            </div>
            {errors.name && <p className='help is-danger'>{errors.name?.message}</p>}
          </div>
          <div className='field'>
            <label className='label'>Account Super Admin Email</label>
            <div className='control'>
              <input
                ref={register}
                className='input'
                name='email'
                placeholder='e.g. awesome_business@aol.com'
                type='email'
              />
            </div>
            {errors.email && <p className='help is-danger'>{errors.email?.message}</p>}
          </div>
          <div className='field'>
            <label className='label'>Google Place</label>
            <div className='control'>
              <GooglePlaceSelect onSelectSuggest={handleOnSelectSuggest} />
              <input
                ref={register}
                name='placeId'
                type='hidden'
              />
            </div>
            {errors.placeId && <p className='help is-danger'>{errors.placeId?.message}</p>}
          </div>
          <div className='field'>
            <label className='label'>Main Contact Name</label>
            <div className='control'>
              <input
                ref={register}
                className='input'
                name='contactName'
                placeholder='Joey Businessowner'
                type='text'
              />
            </div>
            {errors.contactName && <p className='help is-danger'>{errors.contactName?.message}</p>}
          </div>
          <div className='field'>
            <label className='label'>Main Contact Phone</label>
            <div className='control'>
              <input
                ref={register}
                className='input'
                name='phone'
                placeholder='555-555-5555'
                type='phone'
              />
            </div>
            {errors.phone && <p className='help is-danger'>{errors.phone?.message}</p>}
          </div>
          <div className='field'>
            <button
              className={`button is-info mt-2${isLoading ? ' is-loading' : ''}`}
              type='submit'
            >Submit
            </button>
          </div>
        </form>
      </div>
    </div>

  )
}

export default AccountCreate
