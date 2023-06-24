'use client'
import PromptCard  from '@components/PromptCard'
import { getUserState } from '@redux/getUserState'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

function Page() {
  const {isLoggedIn , user} = useSelector(getUserState)
  const params = useParams()
  const [posts , setPosts] = useState([{
    name: '',
    email: '',
    content: '',
    tag: '',
    _id: ''
  }])
  const [oneTime , setOneTime] = useState<number>(1)
  
  if(oneTime === 1){
    const getPosts = async () => {
      try{
        const res = await fetch(`/api/prompt/${params?.id}`)
        const data = await res.json()
        if(res.ok){
          setPosts(data)
        }
      }catch(error){
        console.log(error)
      }
    }
    getPosts()
    setOneTime(2)
  }
  
    return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{posts[0]?.email === user?.email ? 'My' : `${posts[0]?.name}'s`} Profile</span>
      </h1>
      <p className="desc text-left">Welcome to {posts[0]?.email === user?.email ? 'My' : `${posts[0]?.name}'s`} profile page</p>
      <div className="mt-10 prompt_layout">
      {isLoggedIn ? posts.map((post) => {
        return <PromptCard post={post} key={post._id} />
      }) : '' }
      </div>
    </section>
  )
}

export default Page