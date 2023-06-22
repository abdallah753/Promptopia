'use client';

import { getUserState } from '@redux/getUserState';
import { login } from '@redux/slices/UserSlice';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import { useDispatch } from 'react-redux';

function LogIn() {
  const router = useRouter();
  const [email , setEmail] = useState<String>('')
  const [password , setPassword] = useState<String>('')
  const [ error , setError] = useState<Boolean>(false)
  const dispatch = useDispatch()
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      });
      if (response.status === 200) {
        window.localStorage.setItem('user' , JSON.stringify(response.data.user))
        dispatch(login(response.data.user))
        router.replace('/');
      } else {
        setError(true)
      }
    } catch (error) {
      setError(true)
    }
  };


  return (
    <section className="feed mb-28 glassmorphism p-5">
      <form onSubmit={handleSubmit} className="w-full flex-center flex-col gap-8">
        <input
        name='email'
        id='email'
          type="email"
          placeholder="Email"
          required
          className="search_input peer"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
        name='password'
        id='password'
          type="password"
          placeholder="Password"
          required
          className="search_input peer"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className='black_btn'>Log In</button>
        <p className='text-red-600'>{error ? 'Invalid Email Or Password' : ''}</p> 
      </form>
      
    </section>
  )
}

export default LogIn