import React from 'react';
import classnames from 'classnames';
import { Link, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// import NAV_LOGO from '../../assets/images/sipstir_nav_logo.png';

import LOGO_TEXT from '../../assets/images/logo_text@3x.png';

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

import useStyles from './login.styles';

const schema = yup.object().shape({
 email: yup.string().email().required(),
 password: yup.string().required(),
});

const Login = () => {
 const [cookies] = useCookies(['logged_in']);

 const dispatch = useDispatch();
 const navigate = useNavigate();

 const classes = useStyles();

 const { register, handleSubmit, errors } = useForm({
  resolver: yupResolver(schema),
 });

 const from = '/';

 const query = useQuery('authUser', getMe, {
  enabled: false,
  select: (response) => response.data,
  retry: 1,
  onSuccess: (data) => {
   dispatch(setUser(data));
   navigate(from);
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
  <section className={classnames('hero', 'is-fullheight', classes.hero)}>
   <div className="hero-body">
    <div className="container">
     <div className={classnames('column', 'is-4', 'is-offset-4')}>
      <div className="box">
       <figure className={classes.logo}>
        <img src={LOGO_TEXT} alt="logo" />
       </figure>
       <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
         <label className="label" htmlFor="email">
          Email
         </label>
         <div className="control">
          <input className="input" id="email" name="email" ref={register} type="email" />
         </div>
         {errors.email && (
          <p className={classnames('help', 'is-danger')}>{errors.email?.message}</p>
         )}
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

       <div className={classnames('has-text-centered', 'mt-2')}>
        <Link
         className={classnames('has-text-primary', 'has-text-weight-medium', 'has-text-centered')}
         to="/forgot"
        >
         Forgot your password?
        </Link>
       </div>
       <div className={classnames('has-text-centered', 'mt-4', 'has-text-weight-medium')}>
        Don&rsquo;t have an account?{' '}
        <Link className="has-text-primary" to="/create">
         Sign Up Now
        </Link>
       </div>
       <hr />
       <div className={classnames('has-text-centered', 'mt-4', 'has-text-weight-medium')}>
        Any questions?{' '}
        <Link className="has-text-primary" to="/contact">
         Contact Us
        </Link>
       </div>
      </div>
     </div>
    </div>
   </div>
  </section>
 );
};

export default Login;
