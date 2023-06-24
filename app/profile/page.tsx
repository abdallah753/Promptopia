'use client';

import PromptCard from '@components/PromptCard'
import { getUserState } from '@redux/getUserState';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

interface PostProps {
    _id: string;
    content: string;
    tag: string;
    name: string;
    email: string
}


function Profile () {
  const {isLoggedIn , user} = useSelector(getUserState)
  const [posts , setPosts] = useState([])
  const [loding , setLoding] = useState(true)

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch(`/api/prompt/${user?.email}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        setLoding(false)
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error(error);
        // Handle the error appropriately, such as displaying an error message to the user
      }
    }
    getPosts()
  } , [user?.email])
  
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{isLoggedIn ? "my Profile" : 'There Is No User'}</span>
      </h1>
      
      <p className="desc text-left">{isLoggedIn ? 'Welcome to your personalized profile page' : 'Log In Or Sign Up'}</p>
      <div className="mt-10 prompt_layout">
      {isLoggedIn ?  posts.map((post: PostProps) => {
        return <PromptCard key={post._id} post={post}/>
      }) : ''} 
       {loding ? <div className='pt-12'>
        <Image src='/assets/icons/loader.svg' alt='' width={55} height={55}></Image>
      </div> : ''}
      </div>
    </section>
  )
}

export default Profile


