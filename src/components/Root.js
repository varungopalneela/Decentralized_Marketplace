import React from 'react'
import Navbar1 from './Navbar1'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

import './Root.css'


function Root() {
  return (
    <div>
      <Navbar1/>
     <div style={{minHeight:"70vh"}}> <Outlet/></div>
      <Footer/>
    </div>

  )
}

export default Root