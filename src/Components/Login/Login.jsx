import React, { useState } from 'react'
import styles from './Login.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";


export default function Login({saveUserData}) {


  let navigate = useNavigate();
  const [isloading, setisloading] = useState(false)
  const [messageError, setmessageError] = useState('')

  async function handleLogin(values) {
    setisloading(true);
    let { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin
    `, values).catch((errr) => {
      setisloading(false);
      setmessageError(`Error : ${errr.response.data.message}`)
    });

    if (data.message === 'success') {
      localStorage.setItem('userToken', data.token);
      saveUserData();
      setisloading(false);
      navigate('/');
    }

  }

  let validationSchema = yup.object({
    email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password is invalid')
  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin
  });
  return <>
  <Helmet>
      <title>Login</title>
    </Helmet>
    <div className='w-75 mx-auto py-4'>

      <h2>Login now:</h2>
      <form onSubmit={formik.handleSubmit}>
        
        <label htmlFor="email">Email: </label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}

        <label htmlFor="password">Password: </label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}

        {isloading ? <button type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Login</button>}

        {messageError.length > 1 ? <div className='alert alert-danger'> {messageError} </div> : null}


      </form>

    </div>

  </>

}
