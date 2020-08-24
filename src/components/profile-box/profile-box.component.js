import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { updateAccountAction } from '@redux/actions/account'
import { UPDATE_ACCOUNT } from '@redux/actions/types'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers'
import * as yup from 'yup'

import useStyles from './profile-box.style'

require('yup-phone')

const schema = yup.object().shape({
  email: yup.string().email().required(),
  phone: yup.string().phone().required()
})

const ProfileBox = props => {
  const classes = useStyles(props)

  const dispatch = useDispatch()

  const account = useSelector(state => state.account.activeAccount)

  const isLoading = useSelector(state => state.ui.isLoading.some(element => element.loadingType === UPDATE_ACCOUNT))

  const token = useSelector(state => state.auth.token)

  const { register, handleSubmit, errors, setValue } = useForm({
    resolver: yupResolver(schema)
  })

  useEffect(() => {
    if (account) {
      Object.keys(account).forEach(key => {
        setValue(key, account[key], {
          shouldValidate: true,
          shouldDirty: true
        })
      })
    }
  }, [account, setValue])

  const onSubmit = data => {
    let accountData = data

    if (data.image === '') {
      accountData = {
        ...accountData,
        image: null
      }
    }

    dispatch(updateAccountAction({ accountId: account?.id, ...accountData, token }))
  }

  return (
    <div className='container'>
      <h5 className={`title is-5 ${classes.boxTitle}`}>Profile</h5>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='columns'>
          <div className='column is-one-half'>
            <div className='field'>
              <label className='label'>Phone</label>
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
          </div>
          <div className='column is-one-half'>
            <div className='field'>
              <label className='label'>Email</label>
              <div className='control'>
                <input
                  ref={register}
                  className='input'
                  name='email'
                  placeholder='e.g. awesome_business@aol.com'
                  type='email'
                />
              </div>
              {errors.phone && <p className='help is-danger'>{errors.phone?.message}</p>}
            </div>
          </div>
        </div>
        <button
          className={`button is-info${isLoading ? ' is-loading' : ''}`}
          type='submit'
        >Update Profile
        </button>
      </form>
    </div>
  )
}

export default ProfileBox
