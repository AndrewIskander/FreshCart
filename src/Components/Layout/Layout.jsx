import React from 'react'
import styles from './Layout.module.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';

export default function Layout({ logout,token }) {
  return <>
    <div className='my-5 pt-2'>
    <Navbar logout={logout} token={token}/>
    <div className="container">
      <Outlet></Outlet>
    </div>
    <Footer />
    </div>
  </>

}
