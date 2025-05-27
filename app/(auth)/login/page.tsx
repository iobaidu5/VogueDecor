'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import HeaderWrapper from 'components/Header/HeaderWrapper';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await axios.post('/api/auth/login', { email, password });

      if (res.data?.token && typeof window !== 'undefined') {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem(
          'user',
          JSON.stringify({
            username: res.data.user.username,
            email: res.data.user.email,
            image: null,
          })
        );
        router.push('/');
      } else {
        setErrorMsg('Unexpected response from server.');
      }
    } catch (err: any) {
      const message = err?.response?.data?.error || 'Login failed. Please try again.';
      setErrorMsg(message);
    }
  };

  return (
<>
  <HeaderWrapper />
  <div className="w-full bg-gray-100 px-4 flex justify-center">
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] w-full"> {/* adjust 80px if HeaderWrapper is taller/shorter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl p-8 shadow-sm"
      >
        <h2 className="text-center text-3xl font-medium text-gray-900">
          Log in
        </h2>
        <p className="text-center mt-2 text-sm text-gray-600">
          If you already have a VOGUE DECOR customer account, please enter your login information.
        </p>

        <form className="mt-8" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="email" className="sr-only">Email address</label>
            <EnvelopeIcon className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full my-2 pl-8 pr-4 py-2 border-b border-gray-300 focus:outline-none focus:border-black bg-transparent"
              placeholder="Email address"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <LockClosedIcon className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full my-2 pl-8 pr-4 py-2 border-b border-gray-300 focus:outline-none focus:border-black bg-transparent"
              placeholder="Password"
            />
          </div>

          {errorMsg && (
            <p className="text-red-600 text-sm text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            className="group relative w-full mt-4 flex justify-center py-2 px-4 text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            Log In
          </button>
        </form>

        <div className="text-center mt-14">
          <h2 className="text-center text-xl font-extrabold text-gray-900">
            Create an account
          </h2>
          <p className="text-center mt-2 text-sm text-gray-600">
            Create your personal account to join VOGUE DECOR.
          </p>
          <button
            onClick={() => router.push('/signup')}
            className="group relative w-full flex mt-4 justify-center py-2 px-4 text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            Create An Account
          </button>
        </div>
      </motion.div>
    </div>
  </div>
</>


  );
};

export default Login;
