import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { CREATE_USER, CREATE_USER_UPDATE_FORM } from '@actions/types'
import { createUserAction } from '@actions/user'

import ImageUpload from '@components/image-upload/image-upload.component'

const UserCreate = () => {
  const dispatch = useDispatch()

  const avatar = useSelector(state => state.createUser.avatar)
  const email = useSelector(state => state.createUser.email)
  const isLoading = useSelector(state => state.ui.isLoading.some(loader => loader.loadingType === CREATE_USER))
  const username = useSelector(state => state.createUser.username)
  const usernameIsAvailable = useSelector(state => state.createUser.usernameIsAvailable)
  const token = useSelector(state => state.auth.token)
  const accountId = useSelector(state => state.account.activeAccount?.id)

  const handleInputChange = e => {
    e.preventDefault()

    const { name, value } = e.target

    dispatch({
      type: CREATE_USER_UPDATE_FORM,
      payload: { name, value }
    })
  }


  const handleSubmit = e => {
    e.preventDefault()

    dispatch(createUserAction({ accountId, avatar, email, token, username }))
  }

  const usernameClasses = baseClass => {
    let updatedClass = baseClass

    if (username.length > 0 && usernameIsAvailable) {
      updatedClass = `${baseClass} is-success`
    }

    if (!usernameIsAvailable) {
      updatedClass = `${baseClass} is-error`
    }

    return updatedClass
  }

  const handleOnProgress = ({ progressData }) => {
    console.log({ progressData })
  }

  const handleOnUploadComplete = ({ fileUrl }) => {
    dispatch({
      type: CREATE_USER_UPDATE_FORM,
      payload: {
        name: 'avatar',
        value: `${fileUrl}?w=50&h=50&fit=crop`
      }
    })
  }

  return (
    <div className='box'>
      <div className='field'>
        <label className='label'>Email</label>
        <div className='control'>
          <input
            className='input'
            name='email'
            onChange={handleInputChange}
            placeholder='e.g. user@email.com'
            type='email'
            value={email}
          />
        </div>
      </div>
      <div className='field'>
        <label className='label'>Username</label>
        <div className='control has-icons-left has-icons-right'>
          <input
            className={usernameClasses('input')}
            name='username'
            onChange={handleInputChange}
            placeholder='e.g. awesomeperson123'
            type='text'
            value={username}
          />
          <span className='icon is-small is-left'>
            <i className='fas fa-user' />
          </span>
          {username.length > 0 &&
            <span className='icon is-small is-right'>
              {usernameIsAvailable ? <i className='fas fa-check' /> : <i className='fas fa-times' />}
            </span>}
        </div>
        {username.length > 0 &&
          <p className={usernameClasses('help')}>{usernameIsAvailable ? 'Username is available' : 'Username is taken'}</p>}
      </div>
      <ImageUpload
        label='Avatar'
        onComplete={handleOnUploadComplete}
        onProgress={handleOnProgress}
      />
      <div className='field'>
        <div className='control'>
          <button
            className={`button is-primary${isLoading ? ' is-loading' : ''}`}
            onClick={handleSubmit}
          >Create user
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCreate
