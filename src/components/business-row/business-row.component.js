import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { DELETE_BUSINESS, SET_MODAL } from '@redux/actions/types'
import { deleteBusinessAction } from '@redux/actions/account'

import { Link } from 'react-router-dom'

const BusinessRow = ({ business }) => {
  const dispatch = useDispatch()

  const { id, name, location: { vicinity }, email } = business

  const token = useSelector(state => state.auth.token)

  const isDeleting = useSelector(state => state.ui.isLoading.some(element => element.loadingType === DELETE_BUSINESS && element.meta === id))

  const handleDeleteBusiness = () => {
    dispatch({
      type: SET_MODAL,
      payload: {
        activeModal: 'confirmation',
        dispatchOnClose: deleteBusinessAction({ accountId: id, token }),
        message: 'Are you sure you want to delete this business?  They will no longer be able to participate in our program.',
        title: 'Delete business?'
      }
    })
  }

  return (
    <tr>
      <td>{name}</td>
      <td>{vicinity}</td>
      <td>{email}</td>
      <td>Yes</td>
      <td>
        <div className='buttons'>
          <Link
            className='button is-small'
            to={`accounts/${id}`}
          >Edit
          </Link>
          <button
            className={`button is-primary is-small${isDeleting ? ' is-loading' : ''}`}
            onClick={handleDeleteBusiness}
          >Delete
          </button>
        </div>
      </td>
    </tr>
  )
}

export default BusinessRow
