import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { deleteBusinessAction } from '@redux/actions/account'

import { Link } from 'react-router-dom'

import PageHeader from '@components/page-header/page-header.component'

import useStyles from './businesses.style'

const Businesses = () => {
  const classes = useStyles()

  const dispatch = useDispatch()

  const businesses = useSelector(state => state.account.businesses)

  const token = useSelector(state => state.auth.token)

  const handleDeleteBusiness = business => {
    dispatch(deleteBusinessAction({ accountId: business.id, token }))
  }

  return (
    <div>
      <PageHeader title='Businesses' />
      <div className='box'>
        <div className='level'>
          <div className='level-left'>
            <div className='level-item'>
              <span className={classes.tableTitle}>Businesses</span>
            </div>
          </div>
          <div className='level-right'>
            <div className='level-item'>
              <Link
                className='button is-normal is-info has-text-weight-semibold'
                to='/accounts/create'
              >Add New Business
              </Link>
            </div>
          </div>
        </div>
        <table className='table is-fullwidth'>
          <thead>

            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Active</th>
              <th width={150}>
                <div>
                  Actions
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {businesses.map(business => (
              <tr key={`business-${business.id}`}>
                <td>{business.name}</td>
                <td>{business.location.vicinity}</td>
                <td>{business.email}</td>
                <td>Yes</td>
                <td>
                  <div className='buttons'>
                    <button className='button is-small'>Edit</button>
                    <button
                      className='button is-primary is-small'
                      onClick={() => handleDeleteBusiness(business)}
                    >Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Businesses
