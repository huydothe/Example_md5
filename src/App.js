import React from 'react';
import './App.css';
import ListUser from './components/ListUser';
import {Routes, Route} from 'react-router-dom'
import ProductDetail from './components/ProductDetail';
import CreateProduct from './components/CreateProduct';
import EditProduct from './components/UpdateProduct';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ListUser />}/>
      <Route path='/detail' element={<ProductDetail />}/>
      <Route path='/create' element={<CreateProduct />}/>
      <Route path='/edit/:id' element={<EditProduct />}/>
    </Routes>
        
  );
}

export default App;
