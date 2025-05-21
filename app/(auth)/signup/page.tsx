'use client';

import React, { useState } from 'react';
import axios from 'axios';
import BackgroundImage from 'media/png/bgimg.png';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { UserIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const LeftSideImage = () => (
  <div className="hidden md:block md:flex-1 relative h-screen">
    <Image
      src={BackgroundImage}
      alt="Background"
      fill
      className="object-cover"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-tr from-blue-800 via-purple-700 to-pink-600 opacity-60" />
  </div>
);

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
      // Optionally redirect or show success message
    } catch (err: any) {
      console.error('Signup error:', err);
      setError(err?.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      <LeftSideImage />

      <div className="flex flex-1 items-center justify-center px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md space-y-8 bg-white rounded-2xl p-8 shadow-xl"
        >
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create Your Account
          </h2>
          <p className="text-center text-sm text-gray-600">
            Sign up to get started
          </p>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="relative">
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="username"
                name="username"
                type="text"
                required
                value={formData.username}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Username"
              />
            </div>

            {/* Email */}
            <div className="relative">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Email address"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
              />
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-lg text-white bg-black hover:bg-black-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <div className="flex items-center justify-between text-sm">
            <Link href="/login" className="text-black hover:underline font-medium">
              Already have an account?
            </Link>
            <Link href="/forgot-password" className="text-black hover:underline font-medium">
              Forgot password?
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
