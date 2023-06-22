'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { FormEvent, useState } from 'react'

function Update() {
  const [content, setContent] = useState('')
  const [tag, setTag] = useState('')
  const [loding, setLoding] = useState(false)
  const router = useRouter()
  const param = useParams()

    const handelUpdate = async (e: FormEvent) => {
      e.preventDefault()
      setLoding(true)
      try{
        const res = await fetch(`/api/prompt/${param.id}`, {
          method: "PATCH",
          body: JSON.stringify({content, tag})
        })
        if(res.ok){
          setLoding(false)
          router.replace('/')
        }
      }catch(error) {
        setLoding(false)
        console.log(error)
      }
    }

  return (
    <div>
        <form className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism" onSubmit={handelUpdate}>
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          Your AI Prompt
        </span>
        <textarea
          placeholder="Write your prompt here..."
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
        {loding? <div>
          <Image src='/assets/icons/loader.svg' width={35} height={35} alt='loading'/>
        </div> : <button
          type="submit"
          className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white">
          Update
        </button>}
      </div>
    </form>
    </div>
  )
}

export default Update