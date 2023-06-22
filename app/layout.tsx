'use client';

import React, { ReactNode } from 'react'
import "@styles/globals.css";
import Navbar from '@components/Navbar';
import { Provider } from 'react-redux';
import store from '@redux/store';

interface Children {
    children: ReactNode
}

function layout({ children } : Children) {
  return (
    <html lang='en'>
      <Provider store={store}>
        <body>
        <div className='main'>
          <div className='gradient' />
        </div>
            <main className='app'>
              <Navbar />
            {children}
            </main>
        </body>
        </Provider>
        
    </html>
  )
}

export default layout