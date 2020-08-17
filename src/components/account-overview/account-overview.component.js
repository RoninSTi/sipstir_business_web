import React from 'react'

import AccountInfo from '@components/account-info/account-info.component'
import PageHeader from '@components/page-header/page-header.component'
import UserManagement from '@components/user-management/user-management.component'

const AccountOverview = () => {
  return (
    <div>
      <PageHeader title='Account Overview' />
      <AccountInfo />
      <UserManagement />
    </div>
  )
}

export default AccountOverview
