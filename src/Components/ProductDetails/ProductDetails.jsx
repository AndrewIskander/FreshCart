import React, { useContext, useEffect, useState } from 'react'
import styles from './ProductDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import { toast } from 'react-hot-toast';
import { cartContext } from '../../Context/CartContext';
import { Helmet } from "react-helmet";

export default function ProductDetails() {
  
  const [ProductDetails, setProductDetails] = useState()
  const [isLoading, setIsLoading] = useState(false);
  let { id } = useParams()
  let { addToCart , setNumOfCartItems } = useContext(cartContext);
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

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


  async function getProductDetails() {
    setIsLoading(true);
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/products/${id}`)
    setProductDetails(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getProductDetails()
  }, [])
  return <>
<Helmet>
      <title>Product details</title>
    </Helmet>

    {ProductDetails && isLoading == false ? <div className='row align-items-center'>
      <div className='col-md-4'>
        <Slider {...settings}>
          {ProductDetails.images.map((img) => <img key={ProductDetails._id} src={img} className='w-100' />)}

        </Slider>
      </div>
      <div className='col-md-8'>
        <h2>{ProductDetails.title}</h2>
        <p className='text-muted m-3'>{ProductDetails.description}</p>
        <span className='text-main fw-bold font-sm'>{ProductDetails.category.name}</span>
        <div className='d-flex justify-content-between'>
          <span className='text-muted'>{ProductDetails.price} EGP</span>
          <span ><i className='fa fa-star rating-color'></i>{ProductDetails.ratingsAverage}</span>
        </div>
        <button onClick={() => addProduct(ProductDetails._id)} className='btn bg-main text-white w-100 my-2'>+ Add to Cart</button>
      </div>

    </div> : <div className='text-center text-main my-5'> <i className='fa fa-spinner fa-spin fa-2x'></i></div>}

  </>

}
