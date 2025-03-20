import React, { useEffect, useState } from 'react'
import styles from './CategorySlider.module.css';
import Slider from 'react-slick';
import axios from 'axios';

export default function CategorySlider() {
  const [Categories, setCategories] = useState([])
  async function getCategories() {
    let { data } = await axios.get(`https://route-ecommerce.onrender.com/api/v1/categories`)
    setCategories(data.data);
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 2
  };

  useEffect(() => {
    getCategories()
  }, [])
  return <>
      <h2 className='h5 fw-semibold'>Shop Populer Categories</h2>
    <Slider {...settings}>
      {Categories.map((category) => <div key={category._id} >
        <img height={200} src={category.image} className='w-100' />
        <h2 className='h6 pt-2'>{category.name}</h2>
      </div>)}

    </Slider>
  </>

}
