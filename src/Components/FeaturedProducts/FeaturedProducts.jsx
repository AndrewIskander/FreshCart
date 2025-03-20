import React, { useContext, useEffect, useState } from 'react'
import styles from './FeaturedProducts.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import { toast } from 'react-hot-toast';


export default function FeaturedProducts() {
  const [products, setProducts] = useState([])
  let { addToCart, setNumOfCartItems } = useContext(cartContext);

  async function addProduct(productId) {
    let response = await addToCart(productId);
    if (response.data.status === 'success') {
      toast.success(response.data.message, { duration: 2000 })
    setNumOfCartItems(response.data.numOfCartItems)
    } else {
      toast.error(response.data.message, { duration: 2000 })
    }
    console.log(response);
  }


  async function getProducts() {
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products`)
    setProducts(data.data);
  }

  useEffect(() => {
    getProducts()
  }, [])

  return <>
  {products ? <div className='row'>
      {products.map((product) => <div className='col-md-2 product px-2 py-4 cursor-pointer' key={product._id}>
        <Link to={'/productdetails/' + product._id}>
          <img className='w-100' src={product.imageCover} alt="" />
          <span className='text-main fw-bold font-sm'>{product.category.name}</span>
          <h3 className='h6 fw-bolder'>{product.title.split(' ').slice(0, 2).join(' ')}</h3>
          <div className='d-flex justify-content-between'>
            <span className='text-muted'>{product.price} EGP</span>
            <span ><i className='fa fa-star rating-color'></i>{product.ratingsAverage}</span>
          </div>
        </Link>
        <button onClick={() => addProduct(product._id)} className='btn bg-main text-white w-100'>+ Add</button>
      </div>)}
    </div > : <div className='text-center text-main my-5'> <i className='fa fa-spinner fa-spin fa-2x'></i></div>}
    
  </>

}
