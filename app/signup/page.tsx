"use client";
import { useRouter } from 'next/navigation';
import { FormEvent,useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { login } from '@redux/slices/UserSlice';
import Image from 'next/image';
import { putInWindow } from '@lib/putInWindow';

function SignUp() {
  const [name, setName] = useState<String>('');
  const [email, setEmail] = useState<String>('');
  const [password, setPassword] = useState<String>('');
  const [loading , setLoading] = useState(false)
  const [error , setError] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const user = {
      name: name,
      email: email,
      password: password,
    };
      try {
        setLoading(true)
      const response = await axios.post('http://localhost:3000/api/users/signup', user);
      putInWindow(response.data.result)
      dispatch(login(response.data.result))
      router.replace('/');
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  };


  return (
    <section className="feed mb-28 glassmorphism p-5">
      <form  onSubmit={handleSubmit} className="w-full flex-center flex-col gap-8">
        <input
        id="name"
        name='name'
          type="text"
          placeholder="User Name"
          required
          className="search_input peer"
          onChange={(event) => setName(event.target.value)}
        />
        <input
        id="email"
        name='email'
          type="email"
          placeholder="Email"
          required
          className="search_input peer"
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
        id="password"
        name='password'
          type="password"
          placeholder="Password"
          required
          className="search_input peer"
          onChange={(event) => setPassword(event.target.value)}
        />
        {loading ? <div>
          <Image src='/assets/icons/loader.svg' width={35} height={35} alt='loading'/>
        </div> : <button type="submit" className="black_btn">
          Sign Up
        </button>}
        {error ? <p className='text-red-600'>Sign Up Is Faild</p> : ''}
      </form>
    </section>
  );
}
export default SignUp