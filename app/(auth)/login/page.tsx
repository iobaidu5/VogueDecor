'use client';

import React from 'react';
import BackgroundImage from 'media/png/bgimg.png';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

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

const Login = () => {
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
            Welcome Back
          </h2>
          <p className="text-center text-sm text-gray-600">
            Enter your credentials to access your account
          </p>

          <form className="mt-8 space-y-6">
            {/* Email Field */}
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Email address"
              />
            </div>

            {/* Password Field */}
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Password"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-lg text-white bg-black hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
            >
              Sign In
            </button>
          </form>

          {/* Links */}
          <div className="flex items-center justify-between text-sm">
            <Link href="/forgot-password" className="text-black hover:underline font-medium">
              Forgot your password?
            </Link>
            <Link href="/signup" className="text-black hover:underline font-medium">
              Create account
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
