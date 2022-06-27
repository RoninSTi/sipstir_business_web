import { CHECK_USERNAME, CREATE_USER, LOGIN } from '@actions/types';

export const checkUsernameAction = ({ username, token }) => ({
 type: CHECK_USERNAME,
 payload: {
  request: {
   method: 'get',
   url: `user/check/${username}`,
   headers: { Authorization: `Bearer ${token}` },
  },
 },
});

export const createUserAction = ({ avatar, email, username, token }) => ({
 type: CREATE_USER,
 payload: {
  request: {
   method: 'post',
   url: 'user',
   data: {
    avatar,
    email,
    username,
   },
   headers: { Authorization: `Bearer ${token}` },
  },
 },
});

export const loginAction = ({ ...params }) => ({
 type: LOGIN,
 payload: {
  request: {
   method: 'get',
   url: 'auth/swoop/callback',
   params,
  },
  setLoading: {
   meta: null,
  },
 },
});
