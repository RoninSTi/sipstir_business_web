import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { deleteUserAction, updateUserAction } from '@actions/account'
import { DELETE_USER, SET_MODAL, UPDATE_USER } from '@actions/types'

const UserRow = ({ user }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const authUser = useSelector(state => state.auth.user)
  const accountId = useSelector(state => state.account.activeAccount.id)
  const isDeleting = useSelector(state => state.ui.isLoading.some(item => item.loadingType === DELETE_USER && item.meta === user.id))
  const isUpdating = useSelector(state => state.ui.isLoading.some(item => item.loadingType === UPDATE_USER && item.meta === user.id))
  const [role, setRole] = useState(user.AccountUser.role)

  const handleInputChange = e => {
    const { name, value } = e.target

    if (name === 'role') {
      setRole(value)
    }
  }

  const handleDelete = () => {
    dispatch({
      type: SET_MODAL,
      payload: {
        activeModal: 'confirmation',
        dispatchOnClose: deleteUserAction({ accountId, userId: user.id, token }),
        message: 'Are you sure you want to delete this user from your account?',
        title: 'Delete user?'
      }
    })
  }

  const handleSave = () => {
    dispatch(updateUserAction({ accountId, userId: user.id, token, role }))
  }

  const showSave = role !== user.AccountUser.role

  const showDelete = user.id !== authUser?.id

  return (
    <tr>
      <td>{user.email}</td>
      <td>
        <div className='control'>
          <div className='select is-small'>
            <select
              name='role'
              onChange={handleInputChange}
              value={role}
            >
              <option value='admin'>Admin</option>
              <option value='super-admin'>Super Admin</option>
            </select>
          </div>
        </div>
      </td>
      <td>
        <div
          className='buttons'
          style={{ justifyContent: 'flex-end' }}
        >
          {showSave &&
            <button
              className={`button is-info is-small${isUpdating ? ' is-loading' : ''}`}
              disabled={isUpdating}
              onClick={handleSave}
            >Save
            </button>}
          <button
            className={`button is-primary is-small${isDeleting ? ' is-loading' : ''}`}
            disabled={!showDelete || isDeleting}
            onClick={handleDelete}
          >Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default UserRow
