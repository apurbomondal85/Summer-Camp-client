
import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../Shears/NavBar/NavBar'

function Main() {
  return (
    <div>
      <NavBar/>
      <Outlet></Outlet>
      {/* <Footer /> */}
    </div>
  )
}

export default Main
