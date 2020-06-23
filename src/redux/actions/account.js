import { CREATE_ACCOUNT, FETCH_MEMBER_ACCOUNTS } from '@actions/types'

export const createAccountAction = ({ placeId, name, members, token }) => ({
  type: CREATE_ACCOUNT,
  payload: {
    request: {
      method: 'post',
      url: 'account',
      data: {
        placeId,
        name,
        members
      },
      headers: { Authorization: `Bearer ${token}` }
    }
  }
})

export const getMemberAccountsAction = ({ memberId, token }) => ({
  type: FETCH_MEMBER_ACCOUNTS,
  payload: {
    request: {
      method: 'get',
      url: `member/${memberId}/accounts`,
      headers: { Authorization: `Bearer ${token}` }
    }
  }
})
