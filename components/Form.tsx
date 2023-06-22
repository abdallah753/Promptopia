'use client';

import { getUserState } from '@redux/getUserState';
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'
import { useSelector } from 'react-redux';

function Form({titel} : {titel : string}) {
  const [tag, setTag] = useState('')
  const [content, setContent] = useState('')
  const { user } = useSelector(getUserState)
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [loding , setLoding] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoding(true)
    try {
      const response = await fetch("/api/prompt", {
        method: "POST",
        body: JSON.stringify({ tag, content, name, email }),
      })
      console.log(user , response)
      if (response.ok) {
        setLoding(false)
        router.push("/")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism" onSubmit={handleSubmit}>
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Your AI Prompt
        </span>
        <textarea
          placeholder="Write your prompt here ..."
          required
          onChange={(e) => setContent(e.target.value)}
          className="form_textarea"
        />
      </label>
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Tag{` `}
          <span className="font-normal">
            (#product, #webdevelopment, #idea)
          </span>
        </span>
        <input
          placeholder="#tag"
          required
          onChange={(e) => setTag(e.target.value)}
          className="form_input"
        />
      </label>
      <div className="flex-end mx-3 mb-5 gap-4">
        <Link href="/" className="text-grey-500 text-sm">
          Cancel
        </Link>
        {loding ? <div>
          <Image src='/assets/icons/loader.svg' width={35} height={35} alt='loading'/>
        </div> : <button
          type="submit"
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
          {titel}
        </button>}
      </div>
    </form>
  )
}

export default Form