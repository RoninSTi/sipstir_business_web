import { CHECK_USERNAME, CREATE_USER, GET_SIGNED_URL } from '@actions/types'

export const checkUsernameAction = ({ username, token }) => ({
  type: CHECK_USERNAME,
  payload: {
    request: {
      method: 'get',
      url: `user/checkusername/${username}`,
      headers: { Authorization: `Bearer ${token}` }
    }
  }
})

export const createUserAction = ({ accountId, avatar, email, token, username }) => ({
  type: CREATE_USER,
  payload: {
    request: {
      method: 'post',
      url: 'user',
      data: {
        accountId,
        avatar,
        email,
        username
      },
      headers: { Authorization: `Bearer ${token}` }
    }
  }
})

export const getSignedUrlAction = ({ fileName, fileType, token }) => ({
  type: GET_SIGNED_URL,
  payload: {
    request: {
      method: 'post',
      url: 'upload/signedurl',
      data: {
        fileName,
        fileType
      },
      headers: { Authorization: `Bearer ${token}` }
    }
  }
})
