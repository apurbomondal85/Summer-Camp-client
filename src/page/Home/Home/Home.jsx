
import React from 'react'
import Banner from '../Banner/Banner'
import PopularClasses from '../PopularClasses/PopularClasses'
import PopularInstructor from '../PopularInstructor/PopularInstructor'
import Blogs from '../Blogs/Blogs'
import Overview from '../Overview/Overview'

function Home() {
  return (
    <div>
      <Banner></Banner>
      <PopularClasses></PopularClasses>
      <PopularInstructor></PopularInstructor>
      <Blogs></Blogs>
      <Overview></Overview>
    </div>
  )
}

export default Home
