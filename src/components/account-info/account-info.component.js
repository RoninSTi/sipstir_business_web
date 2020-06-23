import React from 'react'

import { useSelector } from 'react-redux'

import { Link } from 'react-router-dom'

import AccountSelector from '@components/account-selector/account-selector.component'
import GooglePhoto from '../google-photo/google-photo.component'

const AccountInfo = () => {
  const account = useSelector(state => state.account.activeAccount)

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
        {!account?.user &&
          <Link
            className='button is-primary'
            to='accounts/user/create'
          >Create app user
          </Link>}
      </div>
    </div>
  )
}

export default AccountInfo
