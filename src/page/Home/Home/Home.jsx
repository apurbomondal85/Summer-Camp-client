
import React from 'react'
import Banner from '../Banner/Banner'
import PopularClasses from '../PopularClasses/PopularClasses'
import PopularInstructor from '../PopularInstructor/PopularInstructor'
import Blogs from '../Blogs/Blogs'

function Home() {
  return (
    <div>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <PopularInstructor></PopularInstructor>
      <Blogs></Blogs>
    </div>
  )
}

export default Home
