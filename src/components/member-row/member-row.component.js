import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { deleteMemberAction, updateMemberAction } from '@actions/account'
import { DELETE_MEMBER, UPDATE_MEMBER } from '@actions/types'

const MemberRow = ({ member }) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.token)
  const accountId = useSelector(state => state.account.activeAccount.id)
  const isDeleting = useSelector(state => state.ui.isLoading.some(item => item.loadingType === DELETE_MEMBER && item.meta === member.id))
  const isUpdating = useSelector(state => state.ui.isLoading.some(item => item.loadingType === UPDATE_MEMBER && item.meta === member.id))
  const [role, setRole] = useState(member.AccountMember.role)

  const handleInputChange = e => {
    const { name, value } = e.target

    if (name === 'role') {
      setRole(value)
    }
  }

  const handleDelete = () => {
    dispatch(deleteMemberAction({ accountId, memberId: member.id, token }))
  }

  const handleSave = () => {
    dispatch(updateMemberAction({ accountId, memberId: member.id, token, role }))
  }

  return (
    <tr key={member.id}>
      <td>{member.email}</td>
      <td>
        <div className='control'>
          <div className='select is-small'>
            <select
              name='role'
              onChange={handleInputChange}
              value={role}
            >
              <option value='user'>User</option>
              <option value='admin'>Admin</option>
            </select>
          </div>
        </div>
      </td>
      <td>
        <div className='buttons'>
          <button
            className={`button is-small${isUpdating ? ' is-loading' : ''}`}
            disabled={member.AccountMember.role === role}
            onClick={handleSave}
          >Save
          </button>
          <button
            className={`button is-danger is-small${isDeleting ? ' is-loading' : ''}`}
            onClick={handleDelete}
          >Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default MemberRow
