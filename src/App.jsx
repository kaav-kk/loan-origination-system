import { BrowserRouter,Routes,Route } from 'react-router-dom'
import React from 'react'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CreateLoan from './pages/CreateLoan'
import ViewLoan from "./pages/ViewLoan";

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
         <Route path="/" element={<Login/>}/>
         <Route path="/dashboard" element={<Dashboard/>}/>
         <Route path="/createLoan" element={<CreateLoan/>}/>
         <Route path="/view-loan" element={<ViewLoan />} />
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
