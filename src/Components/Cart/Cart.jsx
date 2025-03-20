import React, { useContext, useEffect, useState } from 'react'
import styles from './Cart.module.css';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";

export default function Cart() {
  let { getLoggedUserCart, removeItem, updateProductCount, setNumOfCartItems } = useContext(cartContext);
  const [cartDetails, setCartDetails] = useState('')

  async function getCart() {
    let response = await getLoggedUserCart();
    setCartDetails(response?.data?.data);
    console.log(response)
  }
  async function deleteItem(productId) {
    let response = await removeItem(productId);
    setCartDetails(response.data.data);
    setNumOfCartItems(response.data.numOfCartItems)
    toast.success('Item removed successfully')
    console.log(response)
  }
  async function updateProductQuantity(productId, count) {
    let response = await updateProductCount(productId, count);
    setCartDetails(response.data.data);
    toast.success(`Item's count updated successfully`)
  }
  useEffect(() => {
    getCart()
  }
    , [])
  return <>
    <Helmet>
      <title>Cart details</title>
    </Helmet>
    {cartDetails ? <div className='bg-main-light p-4 my-4'>
      <h3>Shop Cart:</h3>
      <h6 className='text-main'>Total Cart Price: {cartDetails.totalCartPrice} EGP</h6>
      {cartDetails.products.map((product) => <div key={product.product._id} className='row align-items-center border-bottom py-2 my-2'>
        <div className='col-md-1'>
          <img src={product.product.imageCover} className='w-100' alt="" />
        </div>
        <div className='col-md-11 d-flex justify-content-between'>
          <div>
            <h6>{product.product.title}</h6>
            <h6 className='text-main'>Price: {product.price}</h6>
            <button onClick={() => deleteItem(product.product._id)} className='m-0 p-0 btn'><i className='fa-regular fa-trash-can text-main'></i>Remove</button>
          </div>
          <div className='d-flex align-items-center'>
            <button onClick={() => updateProductQuantity(product.product._id, product.count + 1)} className='btn bg-main text-white btn-sm'>+</button>
            <span className='mx-2'>{product.count}</span>
            <button onClick={() => updateProductQuantity(product.product._id, product.count - 1)} className='btn btn-danger text-white btn-sm'>-</button>
          </div>
        </div>
      </div>)}
      <button className='btn bg-main mx-4 mt-2'>
        <Link className='text-white' to={'/checkout'}>
          Checkout
        </Link>
      </button>
    </div>

      : <div className='text-center text-main my-5'> <i className='fa fa-spinner fa-spin fa-2x'></i></div>}

  </>

}
