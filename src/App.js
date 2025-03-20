import logo from './logo.svg';
import './App.css';
import Layout from './Components/Layout/Layout';
import { Navigate, RouterProvider, createBrowserRouter, createHashRouter } from 'react-router-dom';
import Home from './Components/Home/Home';
import About from './Components/About/About';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/Notfound/Notfound';
import { useState } from 'react';
import { CartContextProvider } from './Context/CartContext';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import toast, { Toaster } from 'react-hot-toast';
import Checkout from './Components/Checkout/Checkout';
import { Offline, Online } from "react-detect-offline";


function App() {
    const [userData, setuserData] = useState(null);
    const token = localStorage.getItem('userToken');

    function saveUserData() {
        let encodedToken = localStorage.getItem('userToken');
        let decodedToken = jwtDecode(encodedToken);
        setuserData(decodedToken);

    }
    function logout() {
        setuserData(null);
        localStorage.removeItem('userToken');
        return <Navigate to={'/login'} />
    }

    let router = createHashRouter([
        {
            path: '', element: <Layout token={token} logout={logout} />, children: [
                { index: true, element: <ProtectedRoute><Home /> </ProtectedRoute> },
                { path: 'cart', element: <ProtectedRoute><Cart /> </ProtectedRoute> },
                { path: 'checkout', element: <ProtectedRoute><Checkout /> </ProtectedRoute> },
                { path: 'products', element: <ProtectedRoute><Products /> </ProtectedRoute> },
                { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /> </ProtectedRoute> },
                { path: 'Categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
                { path: 'Brands', element: <ProtectedRoute><Brands />  </ProtectedRoute> },
                { path: 'login', element: <Login saveUserData={saveUserData} /> },
                { path: 'register', element: <Register /> },
                { path: '*', element: <Notfound /> },
            ]
        }

    ])
    return <CartContextProvider>
        <Toaster />
        <div className='offline px-2 fw-bold'>
            <Offline>You are currently offline <i className="fa-solid fa-wifi"></i></Offline>
        </div>
        <RouterProvider router={router}></RouterProvider>
    </CartContextProvider>


}

export default App;
