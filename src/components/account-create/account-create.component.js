import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { CREATE_ACCOUNT, CREATE_ACCOUNT_ADD_MEMBER, CREATE_ACCOUNT_DELETE_MEMBER, CREATE_ACCOUNT_UPDATE_FORM } from '@actions/types'
import { createAccountAction } from '@actions/account'

import GooglePlaceSelect from '@components/google-place-select/google-place-select.component'
import MemberInput from '@components/member-input/member-input.component'
import TagList from '@components/tag-list/tag-list.component'

const AccountCreate = () => {
  const dispatch = useDispatch()

  const { email, members, name, placeId } = useSelector(state => state.createAccount)
  const isLoading = useSelector(state => state.ui.isLoading.some(item => item.loadingType === CREATE_ACCOUNT))
  const token = useSelector(state => state.auth.token)

  const handleAddition = ({ email, role }) => {
    dispatch({
      type: CREATE_ACCOUNT_ADD_MEMBER,
      payload: { email, role }
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

    dispatch(createAccountAction({ email, name, members, placeId, token }))
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
      <div className='field'>
        <label className='label'>Business email</label>
        <div className='control'>
          <input
            className='input'
            name='email'
            onChange={handleInputChange}
            placeholder='e.g. awesome_business@aol.com'
            type='email'
            value={email}
          />
        </div>
      </div>
      <GooglePlaceSelect />
      <MemberInput onAdd={handleAddition} />
      <TagList
        items={members.map(member => ({ text: member.email }))}
        onDelete={handleDelete}
      />
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
