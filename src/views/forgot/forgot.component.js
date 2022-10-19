import React from 'react';
import classnames from 'classnames';
import { Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { forgot as forgotFn } from '@mutations/auth';

import AuthBox from '@components/auth-box/auth-box.component';

const schema = yup.object().shape({
 email: yup.string().email().required(),
});

const Forgot = () => {
 const [cookies] = useCookies(['logged_in']);

 const navigate = useNavigate();

 const { register, handleSubmit, errors } = useForm({
  resolver: yupResolver(schema),
 });

 const from = '/';

 const { mutate: forgot, isLoading } = useMutation((userData) => forgotFn(userData), {
  onSuccess: () => {
   toast.success('Please check your email.');
   navigate(from);
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
  forgot({ data });
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

    <button
     className={classnames('button', 'is-block', 'is-fullwidth', 'is-primary', {
      'is-loading': isLoading,
     })}
    >
     Send Link
    </button>
   </form>
  </AuthBox>
 );
};

export default Forgot;
