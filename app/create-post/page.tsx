'use client';

import Form from '@components/Form'
import { getUserState } from '@redux/getUserState';
import React from 'react'
import { useSelector } from 'react-redux';

function CreatePost() {
  const {isLoggedIn} = useSelector(getUserState)
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{isLoggedIn ? 'Create Prompt' : 'Log In Or Sign Up'}</span>
      </h1>
      <p className="desc test-left max-w-md">{isLoggedIn ? 'Create and share amazing prompts to the world and let your imaginatio run wild with any AI-powered platform.' : ''}
      </p>
      {isLoggedIn ? <Form titel='Create'/> : ''}
    </section>
  )
}

export default CreatePost