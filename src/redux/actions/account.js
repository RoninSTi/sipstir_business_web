import { ADD_MEMBER, CREATE_ACCOUNT, DELETE_MEMBER, FETCH_MEMBER_ACCOUNTS, UPDATE_MEMBER } from '@actions/types'

export const addMemberAction = ({ accountId, token, ...data }) => ({
  type: ADD_MEMBER,
  payload: {
    request: {
      method: 'post',
      url: `account/${accountId}/member/add`,
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    setLoading: {
      meta: null
    }
  }
})

export const createAccountAction = ({ email, placeId, name, members, token }) => ({
  type: CREATE_ACCOUNT,
  payload: {
    request: {
      method: 'post',
      url: 'account',
      data: {
        email,
        placeId,
        name,
        members
      },
      headers: { Authorization: `Bearer ${token}` }
    },
    setLoading: {
      meta: null
    }
  }
})

export const deleteMemberAction = ({ accountId, memberId, token }) => ({
  type: DELETE_MEMBER,
  payload: {
    request: {
      method: 'delete',
      url: `account/${accountId}/member/${memberId}`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    setLoading: {
      meta: memberId
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

export const updateMemberAction = ({ accountId, memberId, token, ...data }) => ({
  type: UPDATE_MEMBER,
  payload: {
    request: {
      method: 'put',
      url: `account/${accountId}/member/${memberId}`,
      data,
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    setLoading: {
      meta: memberId
    }
  }
})
