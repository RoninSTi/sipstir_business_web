import React from 'react';
import classnames from 'classnames';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { setUser } from '@slices/auth';
import { login as loginFn } from '@mutations/auth';
import { getMe } from '@queries/user';

import AuthBox from '@components/auth-box/auth-box.component';

const schema = yup.object().shape({
 email: yup.string().email().required(),
 password: yup.string().required(),
});

const Login = () => {
 const [cookies] = useCookies(['logged_in']);

 const dispatch = useDispatch();
 const navigate = useNavigate();

 const { register, handleSubmit, errors } = useForm({
  resolver: yupResolver(schema),
 });

 const query = useQuery('authUser', getMe, {
  enabled: false,
  select: (response) => response.data,
  retry: 1,
  onSuccess: (data) => {
   dispatch(setUser(data));
   navigate('/dashboard');
  },
 });

 const { mutate: login, isLoading } = useMutation((userData) => loginFn(userData), {
  onSuccess: () => {
   query.refetch();
   toast.success('You successfully logged in');
  },
  onError: (error) => {
   if (Array.isArray(error.response.data.error)) {
    error.response.data.error.forEach((el) =>
     toast.error(el.message, {
      position: 'top-right',
     }),
    );
   } else {
    toast.error(error.response.data.message, {
     position: 'top-right',
    });
   }
  },
 });

 const onSubmit = (data) => {
  login({ data });
 };

 if (cookies.logged_in) {
  return <Navigate to="/dashboard" />;
 }

 return (
  <AuthBox>
   <form onSubmit={handleSubmit(onSubmit)}>
    <div className="field">
     <label className="label" htmlFor="email">
      Email
     </label>
     <div className="control">
      <input className="input" id="email" name="email" ref={register} type="email" />
     </div>
     {errors.email && <p className={classnames('help', 'is-danger')}>{errors.email?.message}</p>}
    </div>

    <div className="field">
     <label className="label" htmlFor="password">
      Password
     </label>
     <div className="control">
      <input className="input" id="password" name="password" ref={register} type="password" />
     </div>
     {errors.password && (
      <p className={classnames('help', 'is-danger')}>{errors.password?.message}</p>
     )}
    </div>
    <button
     className={classnames('button', 'is-block', 'is-fullwidth', 'is-primary', {
      'is-loading': isLoading,
     })}
    >
     Login
    </button>
   </form>
  </AuthBox>
 );
};

export default Login;
