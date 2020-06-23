import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { CREATE_ACCOUNT, CREATE_ACCOUNT_ADD_MEMBER, CREATE_ACCOUNT_DELETE_MEMBER, CREATE_ACCOUNT_UPDATE_FORM } from '@actions/types'
import { createAccountAction } from '@actions/account'
import { validateEmail } from '@utils/stringTest'

import InputTag from '@components/input-tag/input-tag.component'
import GooglePlaceSelect from '@components/google-place-select/google-place-select.component'

const AccountCreate = () => {
  const dispatch = useDispatch()

  const name = useSelector(state => state.createAccount.name)
  const members = useSelector(state => state.createAccount.members)
  const isLoading = useSelector(state => state.ui.isLoading.some(item => item.loadingType === CREATE_ACCOUNT))
  const token = useSelector(state => state.auth.token)
  const placeId = useSelector(state => state.createAccount.placeId)

  const handleAddition = tag => {
    console.log({ tag })
    dispatch({
      type: CREATE_ACCOUNT_ADD_MEMBER,
      payload: tag
    })
  }

  const handleDelete = i => {
    dispatch({
      type: CREATE_ACCOUNT_DELETE_MEMBER,
      payload: i
    })
  }

  const handleInputChange = e => {
    e.preventDefault()

    const { name, value } = e.target

    dispatch({
      type: CREATE_ACCOUNT_UPDATE_FORM,
      payload: { name, value }
    })
  }

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(createAccountAction({ name, members, placeId, token }))
  }

  const handleValidate = tag => {
    return validateEmail(tag)
  }

  return (
    <div className='box'>
      <div className='field'>
        <label className='label'>Name</label>
        <div className='control'>
          <input
            className='input'
            name='name'
            onChange={handleInputChange}
            placeholder='Account name'
            type='text'
            value={name}
          />
        </div>
      </div>
      <GooglePlaceSelect />
      <div className='field'>
        <label className='label'>Members</label>
        <div className='control'>
          <InputTag
            handleAddition={handleAddition}
            handleDelete={handleDelete}
            handleValidate={handleValidate}
            tags={members}
          />
        </div>
      </div>
      <div className='field'>
        <div className='control'>
          <button
            className={`button is-primary${isLoading ? ' is-loading' : ''}`}
            onClick={handleSubmit}
          >Create Account
          </button>
        </div>
      </div>
    </div>
  )
}

export default AccountCreate
