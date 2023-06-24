'use client';

import Feed from '@components/Feed'
import React from 'react'


interface PostProps {
  id: number;
  content: string;
  tag: string;
}

interface Posts {
  posts: PostProps[]
}

function Home() {  
  return (
    <section className='w-full flex-center flex-col'>
        <h1 className='head_text text-center'>
      Discover & Share
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> AI-Powered Prompts</span>
    </h1>
    <p className='desc text-center'>
      Promptopia is an open-source AI prompting tool for modern world to
      discover, create and share creative prompts
    </p>
    <Feed />
    </section>
  )
}

export default Home




/*https://lnkd.in/dUGhWarT */

/*https://github.com/Hazem8820 */

/*https://github.com/ShadAfridi/promptopia */

/*https://github.com/gitdagray/next-js-course */

/*https://www.youtube.com/watch?v=yoo2A8T6pOU&t=204s */

/*https://dev.to/alexmercedcoder/building-a-full-stack-todo-list-with-mongodb-nextjs-typescript-2f75 */