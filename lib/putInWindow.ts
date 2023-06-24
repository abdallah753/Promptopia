'use client'
import  Cookies  from "js-cookie";

export const putInWindow = (data: any) => {
    
      
  Cookies.set('user', JSON.stringify(data));
    
  };