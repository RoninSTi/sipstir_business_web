import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';

import { login as loginFn } from '../../mutations/auth';

const schema = yup.object().shape({
 email: yup.string().email().required(),
 password: yup.string().required(),
});

const Auth = () => {
 const navigate = useNavigate();

 const { register, handleSubmit, errors } = useForm({
  resolver: yupResolver(schema),
 });

 const from = '/';

 const { mutate: login, isLoading } = useMutation((userData) => loginFn(userData), {
  onSuccess: () => {
   // query.refetch();
   toast.success('You successfully logged in');
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
  login({ data });
 };

 return (
  <section className="hero is-success is-fullheight">
   <div className="hero-body">
    <div className="container has-text-centered">
     <div className="column is-4 is-offset-4">
      <h3 className="title has-text-black">Login</h3>
      <hr className="login-hr" />
      <p className="subtitle has-text-black">Please login to proceed.</p>
      <div className="box">
       <figure className="avatar">
        <img src="https://via.placeholder.com/150" alt="logo" />
       </figure>
       <form onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
         <div className="control">
          <input
           className="input"
           name="email"
           placeholder="Your Email"
           ref={register}
           type="email"
          />
         </div>
         {errors.email && <p className="help is-danger">{errors.email?.message}</p>}
        </div>

        <div className="field">
         <div className="control">
          <input
           className="input"
           name="password"
           placeholder="Your Password"
           ref={register}
           type="password"
          />
         </div>
         {errors.password && <p className="help is-danger">{errors.password?.message}</p>}
        </div>
        <div className="field">
         <label className="checkbox">
          <input type="checkbox" />
          Remember me
         </label>
        </div>
        <button className={`button is-block is-info is-fullwidth${isLoading ? ' is-loading' : ''}`}>
         Login <i className="fa fa-sign-in" aria-hidden="true"></i>
        </button>
       </form>
      </div>
      <p className="has-text-grey">
       <a href="../">Sign Up</a> &nbsp;·&nbsp;
       <a href="../">Forgot Password</a> &nbsp;·&nbsp;
       <a href="../">Need Help?</a>
      </p>
     </div>
    </div>
   </div>
  </section>
 );
};

export default Auth;
