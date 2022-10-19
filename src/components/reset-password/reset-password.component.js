import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { reset as resetFn } from '@mutations/auth';

const schema = yup.object().shape({
 password: yup.string().required(),
});

const Reset = ({ otp }) => {
 const navigate = useNavigate();

 const { register, handleSubmit, errors } = useForm({
  resolver: yupResolver(schema),
 });

 const from = '/';

 const { mutate: forgot, isLoading } = useMutation((userData) => resetFn(userData), {
  onSuccess: () => {
   toast.success('Password reset successfully.');
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
  forgot({
   data: {
    ...data,
    otp,
   },
  });
 };

 return (
  <form onSubmit={handleSubmit(onSubmit)}>
   <div className="field">
    <label className="label" htmlFor="password">
     New Password
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
    Reset Password
   </button>
  </form>
 );
};

Reset.propTypes = {
 otp: PropTypes.string,
};

export default Reset;
