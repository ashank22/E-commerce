import React from 'react'
import Header from '../components/headers/Header'
import Footer from '../components/Footer'
import {  Products } from '../components/Products'
import {Routes,Route} from 'react-router-dom'
import Login from '../components/Login'
import Register from '../components/Register'
import ProductPage from '../components/ProductPage'
import Cart from '../components/Cart'
const Home = () => {
  return (
    <div className='flex flex-col h-full'>
      <Header/>
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/item/:id' element={<ProductPage/>} />
        <Route path='/cart' element={<Cart/>}/>

      </Routes>
      <Footer/>

  
    
    </div>
  )
}

export default Home
