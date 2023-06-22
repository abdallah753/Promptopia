"use client";


import Image from 'next/image'
import React, { useState } from 'react'
import { usePathname , useRouter} from "next/navigation";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { getUserState } from '@redux/getUserState';


export interface PostProps {
  post: {
    _id: number;
    content: string;
    tag: string;
    name: string;
    email: string;
  };
}


function PromptCard({post} : PostProps) {
  const {user} = useSelector(getUserState)
  const path = usePathname()  
  const router = useRouter()  
  const [copied, setCopied] = useState<boolean | String>("");
  const handelUpdate = () => {
    router.push(`/update-prompt/${post._id}`)
  }
  const handelDelete = async () => {
    alert('Do You Want To Delete Prompt')
    try{
      const res = await fetch(`/api/prompt/${post._id}` , {
        method: "DELETE",
      })
      if(res.ok){
        router.push('/')
      }
    }catch(error){
      console.log(error)
    }
  }

  const handleCopy = () => {
    setCopied(post.content);
    navigator.clipboard.writeText(post.content);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className='prompt_card'>
        <div className='flex-between'>
        <div className='flex gap-5'>
            <Link href={`profile/${post.email}`}><Image src="/assets/images/logo.svg" alt="" width={30} height={30} /></Link>
            <div>
            <p className='font-satoshi font-semibold text-gray-900'>{post.name}</p>
            <p className='font-inter text-sm text-gray-500'>{post.email}</p>
            </div>
        </div>
        <div className='copy_btn' onClick={handleCopy}>
        {copied ? <Image src='/assets/icons/tick.svg' alt="copy_btn"
            width={12}
            height={12} /> : <Image src='/assets/icons/copy.svg' alt="copy_btn"
            width={12}
            height={12} />}
        </div>
        </div>
        <p className='my-4 font-satoshi text-sm text-gray-700'>{post.content}</p>
        <p className='font-inter text-sm blue_gradient cursor-pointer'>{post.tag.startsWith('#') ? post.tag : `# ${post.tag}`}</p>
        {path !== `/profile/${user.email}` && path !== '/profile' || path !== '/profile' && user.email !== post.email ? <></> : <div className="mt-5 flex-center gap-4 border-t  border-gray-100 pt-3">
          <p onClick={handelUpdate}
            className="font-inter text-sm green_gradient cursor-pointer">
            Edit
          </p>
          <p onClick={handelDelete}
            className="font-inter text-sm orange_gradient cursor-pointer">
            Delete
          </p>
        </div>}
    </div>
  )
}

export default PromptCard