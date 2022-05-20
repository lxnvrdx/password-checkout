import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import App from './App'
import IsStudent from './IsStudent'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path="/IsStudent" element={<IsStudent />} />
      <Route path="/" element={<App />} />
      </Routes>
    </Router>
    
  </React.StrictMode>
)
