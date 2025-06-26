import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-cyan-500 p-3 mb-5'>
      <div className='logo flex mx-11'>
        <span>iTask</span>
      </div>
      <ul className='flex gap-9 mx-11'>
        <li>Home</li>
        <li>About</li>
        <li>Contact Us</li>
      </ul>
    </nav>
  )
}

export default Navbar
