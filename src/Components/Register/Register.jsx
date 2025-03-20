import React, { useState } from 'react'
import styles from './Register.module.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { Helmet } from "react-helmet";

export default function Register() {
  let navigate = useNavigate();
  const [isloading, setisloading] = useState(false)
  const [messageError, setmessageError] = useState('')

  async function handleRegister(values) {
    setisloading(true);
    let { data } = await axios.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup
    `, values).catch((errr) => {
      setisloading(false);
      setmessageError(`Error : ${errr.response.data.message}`)
    });

    if (data.message === 'success') {
      setisloading(false);
      navigate('/login');
    }

  }

  let validationSchema = yup.object({
    name: yup.string().required('Name is required').min(3, 'Min name length is 3').max(12, 'Max name length is 12'),
    email: yup.string().required('Email is required').email('Email is invalid'),
    password: yup.string().required('Password is required').matches(/^[A-Z][a-z0-9]{5,10}$/, 'Password is invalid'),
    rePassword: yup.string().required('Repassword is required').oneOf([yup.ref('password')], 'Repassword is not same to the password'),
    phone: yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}$/, 'Phone is invalid')
  })

  // function validate(values) {
  //   let errors = {};
  //   if (!values.name) {
  //     errors.name = 'Name is required';
  //   }
  //   else if (values.name.length < 3) {
  //     errors.name = 'Minimum name length is 3';
  //   }
  //   else if (values.name.length > 12) {
  //     errors.name = 'Maximum name length is 12';
  //   }

  //   if (!values.email) {
  //     errors.email = 'Email is required';
  //   }
  //   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Invalid email address';
  //   }

  //   if (!values.password) {
  //     errors.password = 'Password is required';
  //   }
  //   else if (!/^[A-Z][a-z0-9]{5,10}$/.test(values.email)) {
  //     errors.password = 'Password must container [A a 123]';
  //   }

  //   if (!values.rePassword) {
  //     errors.rePassword = 'RePassword is required';
  //   }
  //   else if (values.rePassword !== values.password) {
  //     errors.rePassword = 'Repassword is not same to password';
  //   }

  //   if (!values.phone) {
  //     errors.phone = 'Phone is required';
  //   }
  //   else if (/^01[0125][0-9]{8}$/.test(values.phone)) {
  //     errors.phone = 'Phone is not valid eg number.';
  //   }

  //   return errors
  // }

  let formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      password: '',
      rePassword: ''
    },
    validationSchema,
    onSubmit: handleRegister
  });
  return <>
  <Helmet>
      <title>Register</title>
    </Helmet>
    <div className='w-75 mx-auto py-4'>

      <h2>Register now:</h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name: </label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} type="text" name="name" id="name" placeholder='between 3-12' />
        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> : null}


        <label htmlFor="email">Email: </label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} type="email" name="email" id="email" />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : null}

        <label htmlFor="password">Password: </label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} type="password" name="password" id="password" />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : null}

        <label htmlFor="rePassword">Repassword: </label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger">{formik.errors.rePassword}</div> : null}

        <label htmlFor="phone">Phone: </label>
        <input className='form-control mb-2' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.phone} type="tel" name="phone" id="phone" placeholder='Egypt number' />
        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger">{formik.errors.phone}</div> : null}


        {isloading ? <button type='button' className='btn bg-main text-white'><i className='fas fa-spinner fa-spin'></i></button> : <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-white'>Register</button>}


        {messageError.length > 1 ? <div className='alert alert-danger'> {messageError} </div> : null};



      </form>

    </div>

  </>

}
