import { CREATE_MEMBER } from '@actions/types';

export const createMemberAction = ({ email, token }) => ({
 type: CREATE_MEMBER,
 payload: {
  request: {
   method: 'post',
   url: 'member',
   data: {
    email,
   },
   headers: { Authorization: `Bearer ${token}` },
  },
 },
});
