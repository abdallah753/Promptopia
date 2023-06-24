"use client";

import { getUserState } from '@redux/getUserState';
import { logout } from '@redux/slices/UserSlice';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';


function Navbar() {
  const dispatch = useDispatch()
  const {isLoggedIn} = useSelector(getUserState)
  const handelSignOut = () => {
    Cookies.remove('user')
    dispatch(logout())
  }
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/logo.svg'
          alt='logo'
          width={30}
          height={30}
          className='object-contain'
        />
        <p className='logo_text'>Promptopia</p>
      </Link>
      {isLoggedIn ? <div className='flex gap-2'>
        <Link href='/create-post' className='black_btn'>Create Post</Link>
        <button className='outline_btn' onClick={handelSignOut}>Sign Out</button>
        <Link href='/profile'><Image
          src='/assets/images/logo.svg'
          width={37}
          height={37}
          className='rounded-full'
          alt='profile'
        /></Link>
      </div> : <div className='flex gap-2'>
      <Link href='/signup' className='black_btn'>Sign Up</Link> 
      <Link href='/login' className='black_btn'>Log In</Link> 
      </div>}
    </nav>
  )
}

export default Navbar

