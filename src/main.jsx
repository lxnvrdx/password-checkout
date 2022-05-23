import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import App from './App'
import IsStudent from './IsStudent'
import { Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../content/logoproenembranco.png'


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    
  <Col className='col-3 d-flex mx-auto'>
  <img src={logo} alt="logo proenem" className='img-fluid  mx-auto' />
  </Col>
    <Router>
      <Routes>
 
      <Route path="/IsStudent" element={<IsStudent />} />
      <Route path="/" element={<App />} />
      </Routes>
    </Router>
    
  </React.StrictMode>
)
