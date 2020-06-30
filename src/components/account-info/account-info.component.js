import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { addMemberAction } from '@actions/account'
import { ADD_MEMBER } from '@actions/types'

import AccountSelector from '@components/account-selector/account-selector.component'
import GooglePhoto from '../google-photo/google-photo.component'
import MemberInput from '@components/member-input/member-input.component'
import MemberRow from '@components/member-row/member-row.component'

const AccountInfo = () => {
  const dispatch = useDispatch()

  const account = useSelector(state => state.account.activeAccount)
  const token = useSelector(state => state.auth.token)
  const isAddingMember = useSelector(state => state.ui.isLoading.some(item => item.loadingAction === ADD_MEMBER))

  const handleOnAdd = ({ email, role }) => {
    dispatch(addMemberAction({ email, role, accountId: account.id, token }))
  }

  return (
    <div>
      <div className='box mb-2'>
        <div className='field'>
          <label className='label'>Active account</label>
          <div className='control'>
            <AccountSelector />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Name</label>
          <div className='control'>
            <input
              className='input'
              disabled
              name='name'
              type='text'
              value={account?.name || 'Account name'}
            />
          </div>
        </div>
        <div className='field'>
          <label className='label'>Location</label>
          <article className='media'>
            <div className='media-left'>
              <figure className='image is-64x64'>
                <GooglePhoto
                  maxheight={64}
                  // eslint-disable-next-line camelcase
                  photoreference={account?.location?.photo?.photo_reference}
                />
              </figure>
            </div>
            <div className='media-content'>
              <div className='content' />
              <strong>{account?.location?.name || 'Location name'}</strong>
              <br />
              <span>{account?.location?.vicinity || 'Location vicinity'}</span>
            </div>
          </article>
        </div>
        {account?.user &&
          <div className='field'>
            <label className='label'>App user</label>
            <article className='media'>
              <div className='media-left'>
                <figure className='image is-64x64'>
                  <img
                    alt='avatar'
                    src={account?.user?.avatar}
                  />
                </figure>
              </div>
              <div className='media-content'>
                <div className='content' />
                <strong>{account?.user?.username || 'Username'}</strong>
                <br />
                <span>{account?.user?.email || 'Email'}</span>
              </div>
            </article>
          </div>}
        <div className='field'>
          <MemberInput
            isLoading={isAddingMember}
            onAdd={handleOnAdd}
          />
          {account.members.length > 0 &&
            <div className='table-container'>
              <table className='table is-fullwidth'>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {account.members.map((member, index) => (
                    <MemberRow
                      key={`member-${member.id}`}
                      member={member}
                    />
                  ))}
                </tbody>
              </table>
            </div>}

        </div>
      </div>
    </div>
  )
}

export default AccountInfo
