import React, { useEffect, useState } from 'react'
import styles from './MainSlider.module.css';
import Slider from 'react-slick';
import axios from 'axios';
import slider1 from '../../Assets/images/slider-image-1.jpeg'
import slider2 from '../../Assets/images/slider-image-2.jpeg'
import slider3 from '../../Assets/images/slider-image-3.jpeg'

export default function MainSlider() {

  const settings = {
    dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return <>
    <div className='row gx-0 py-3'>
      <div className='col-md-9 '>
        <Slider {...settings}>
          <img src={slider3} className='w-100' height={400} alt="" />
          <img src={slider1} className='w-100' height={400} alt="" />
          <img src={slider2} className='w-100' height={400} alt="" />
        </Slider>
      </div>
      <div className='col-md-3'>
        <img src={slider1} className='w-100' height={200} alt="" />
        <img src={slider2} className='w-100' height={200} alt="" />

      </div>
    </div>
  </>

}
