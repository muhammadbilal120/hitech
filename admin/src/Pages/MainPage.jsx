import React from 'react'
// import logo from '../assets/'
import { assets } from '../assets/assets'

const MainPage = () => {
  return (
    <div>
        <h1 style={{fontSize: '50px' , lineHeight: 1.5}}>
            Welcome to <br /> <span style={{fontWeight:'bolder', color:'#811C30'}}>HiTech Admin Panel</span>
        </h1>
        {/* <img className='w-100' src={assets.logo} alt="" /> */}
    </div>
  )
}

export default MainPage