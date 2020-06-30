import { CREATE_REWARD, FETCH_REWARDS, UPDATE_REWARD } from '@actions/types'

export const createRewardAction = ({ history, token, ...rewardData }) => ({
  type: CREATE_REWARD,
  payload: {
    history,
    request: {
      method: 'post',
      url: 'reward',
      data: {
        ...rewardData
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    setLoading: {
      meta: null
    }
  }
})

export const fetchRewardsAction = ({ accountId, token }) => ({
  type: FETCH_REWARDS,
  payload: {
    request: {
      method: 'get',
      url: `account/${accountId}/rewards`,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }
})

export const updateRewardAction = ({ token, rewardId, ...rewardData }) => ({
  type: UPDATE_REWARD,
  payload: {
    request: {
      method: 'put',
      url: `reward/${rewardId}`,
      data: {
        ...rewardData
      },
      headers: {
        Authorization: `Bearer ${token}`
      }
    },
    setLoading: {
      meta: rewardId
    }
  }
})

