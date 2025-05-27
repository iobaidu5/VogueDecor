'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import HeaderWrapper from 'components/Header/HeaderWrapper';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/signup', formData);
      console.log('Signup success:', response.data);
      setFormData({ username: '', email: '', password: '' });
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
<>
  <HeaderWrapper />
  <div className="w-full bg-gray-100 px-4 flex justify-center">
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] w-full shadow-xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white rounded-2xl p-8"
      >
        <h2 className="text-center text-3xl mb-2 font-extrabold text-gray-900">
          Create Your Account
        </h2>
        <p className="text-center text-sm text-gray-600">Sign up to get started</p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <label htmlFor="username" className="sr-only">Username</label>
            <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="username"
              name="username"
              type="text"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full border-b border-gray-300 bg-transparent py-2 pl-10 pr-4 focus:outline-none focus:border-black"
              placeholder="Username"
            />
          </div>

          <div className="relative">
            <label htmlFor="email" className="sr-only">Email address</label>
            <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border-b border-gray-300 bg-transparent py-2 pl-10 pr-4 focus:outline-none focus:border-black"
              placeholder="Email address"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">Password</label>
            <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              id="password"
              name="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full border-b border-gray-300 bg-transparent py-2 pl-10 pr-4 focus:outline-none focus:border-black"
              placeholder="Password"
            />
          </div>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-lg text-white bg-black hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <div className="text-center text-sm pt-2">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link href="/login" className="text-black font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  </div>
</>

  );
};

export default SignUp;
