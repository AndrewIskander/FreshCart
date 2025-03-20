import React, { useContext } from 'react'
import styles from './Checkout.module.css';
import { useFormik } from 'formik';
import { cartContext } from '../../Context/CartContext';

export default function Checkout() {

  let { onlinePayment, cartId } = useContext(cartContext);

  async function handleSubmit(values) {
    let response = await onlinePayment(cartId, values);
    if (response?.data?.status === 'success') {
      window.location.href = response.data.session.url;
    }
    console.log(response);
  }

  let formik = useFormik({
    initialValues: {
      details: '',
      city: '',
      phone: ''
    },
    onSubmit: handleSubmit
  })

  return <>
    <div className='w-50 py-5 mx-auto'>
      <h2 className='mb-3'>Checkout: </h2>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor='details'>Details: </label>
        <input className='form-control mb-3' value={formik.values.details} onChange={formik.handleChange} type="text" name='details' id='details' />
        <label htmlFor='city'>City: </label>
        <input className='form-control mb-3' value={formik.values.city} onChange={formik.handleChange} type="text" name='city' id='city' />
        <label htmlFor='phone'>Phone: </label>
        <input className='form-control mb-3' value={formik.values.phone} onChange={formik.handleChange} type="tel" name='phone' id='phone' />
        <button type='submit' className='btn bg-main w-100 text-white'>Pay</button>
      </form>
    </div>
  </>

}
