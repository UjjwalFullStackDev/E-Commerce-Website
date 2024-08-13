import { useState } from 'react'
// import './App.css'
import Header from './Component/Header/Header'
import Footer from './Component/Footer/Footer'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './Component/Homepage/Homepage'
import ProductDetails from './Component/ProductDetails/ProductDetails'
import PageNoteFound from './Component/PageNoteFound/PageNoteFound'
import ShoppingCart from './Component/ShoppingCart/ShoppingCart'
function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='product-details/:id' element={<ProductDetails />}/>
        <Route path='/cart' element={<ShoppingCart />}/>
        <Route path='*' element={<PageNoteFound/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
