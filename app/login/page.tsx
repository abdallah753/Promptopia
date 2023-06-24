'use client'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { login } from '@redux/slices/UserSlice';
import axios from 'axios';
import Image from 'next/image';
import React, { FormEvent, useState } from 'react';
import { putInWindow } from '@lib/putInWindow';

const LogIn: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/api/users/login', {
        email,
        password,
      });
      if (response.status === 200) {
        if (typeof window!== 'undefined') {
          putInWindow(response.data.user);
          dispatch(login(response.data.user));
        }
        router.push('/');
        setLoading(false);
      } else {
        setError(true);
        setLoading(false);
      }
    } catch (error) {
      setError(true);
      setLoading(false);
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
        {loading? (
          <div className='pt-12'>
            <Image src='/assets/icons/loader.svg' alt='' width={55} height={55}></Image>
          </div>
        ) : (
          <button className='black_btn'>Log In</button>
        )}
        <p className='text-red-600'>{error? 'Invalid Email Or Password' : ''}</p> 
      </form>
    </section>
  )
}

export default LogIn;
/*
'use client';

import { putInWindow } from '@lib/putInWindow';
import { login } from '@redux/slices/UserSlice';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

function LogIn() {
  const router = useRouter();
  const [loading , setLoading] = useState(false)
  const [email , setEmail] = useState<String>('')
  const [password , setPassword] = useState<String>('')
  const [ error , setError] = useState<Boolean>(false)
  const dispatch = useDispatch()


    const handleSubmit = async (e: FormEvent) => {
      setLoading(true)
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3000/api/users/login', {
          email,
          password,
        });
        if (response.status === 200) {
          putInWindow(response.data.user)
          dispatch(login(response.data.user))
          router.replace('/');
          setLoading(false)
        } else {
          setError(true)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
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
        {loading? <div className='pt-12'>
          <Image src='/assets/icons/loader.svg' alt='' width={55} height={55}></Image>
        </div> : <button className='black_btn'>Log In</button>}
        <p className='text-red-600'>{error ? 'Invalid Email Or Password' : ''}</p> 
      </form>
      
    </section>
  )
}

export default LogIn  

/*import { login } from '@redux/slices/UserSlice';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

function LogIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const [error, setError] = useState<Boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleSubmit = async (e: FormEvent) => {
      setLoading(true);
      e.preventDefault();
      try {
        const response = await axios.post('http://localhost:3000/api/users/login', {
          email,
          password,
        });
        if (response.status === 200) {
          .localStorage.setItem('user', JSON.stringify(response.data.user));
          dispatch(login(response.data.user));
          router.replace('/');
          setLoading(false);
        } else {
          setError(true);
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
    };

    return () => {
      // cleanup function
    };
  }, [email, password, dispatch, router]);

  return (
    <section className="feed mb-28 glassmorphism p-5">
      <form onSubmit={(e) => handleSubmit(e)} className="w-full flex-center flex-col gap-8">
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
        {loading? (
          <div className='pt-12'>
            <Image src='/assets/icons/loader.svg' alt='' width={55} height={55}></Image>
          </div>
        ) : (
          <button className='black_btn'>Log In</button>
        )}
        <p className='text-red-600'>{error? 'Invalid Email Or Password' : ''}</p> 
      </form>

    </section>
  );
}

export default LogIn;
 */