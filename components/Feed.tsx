'use client'
import { getUserState } from '@redux/getUserState'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PromptCard from './PromptCard'
import Image from 'next/image'

interface PostProps {
  tag: string;
  content: string;
  name: string;
  _id : string;
  email: string
}

function Feed() {
  const { isLoggedIn } = useSelector(getUserState)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [helpInFilter, setHelpInFilter] = useState([])
  let search = ''

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await fetch('/api/prompt');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        setLoading(false)
        const data = await res.json();
        setHelpInFilter(data)
        setPosts(data);
      } catch (error) {
        console.error(error);
        // Handle the error appropriately, such as displaying an error message to the user
      }
    }
    getPosts()
  }, [])

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPosts(helpInFilter)
    search = e.target.value
    const filtered = helpInFilter.filter((post: PostProps) => {
      return post.content.includes(search) || post.tag.includes(search)
    })
    setPosts(filtered)
  }

  return (
    <>
      <section className="feed mb-28">
        <form className="w-full flex-center">
          <input
            type="text"
            onChange={(e) => handleSearch(e)}
            placeholder="Search for a tag or a username"
            required
            className="search_input peer"
          />
        </form>
      </section>
      <div className={`grid  gap-4 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3`}>
        {isLoggedIn? posts.map((post) => {
          return <PromptCard key={post._id} post={post} />
        }) : ''}
        {loading? <div className='pt-12'>
          <Image src='/assets/icons/loader.svg' alt='' width={55} height={55}></Image>
        </div> : ''}
      </div>
    </>
  )
}

export default Feed