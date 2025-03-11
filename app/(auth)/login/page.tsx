import React from 'react';
import BackgroundImage from 'media/png/bgimg.png';
import Image from 'next/image';
import Link from 'next/link';

const LeftSideImage = () => {
  return (
    <div className="xs:hidden xs:w-0 relative h-screen flex-1 md:block md:w-4/5">
      <Image
        src={BackgroundImage}
        alt="Background"
        layout="fill"
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
};

const Login = () => {
  return (
    <div className="flex h-screen w-full">
      <LeftSideImage />
      <div className="xs:w-full relative flex h-full flex-1 items-center justify-center md:w-1/5">
        <div className="flex w-3/4 max-w-lg flex-col">
          <div className="mb-12 flex flex-col items-center justify-center gap-2">
            <span className="xs:text-[22px] font-[700] md:text-[28px]">Login</span>
          </div>
          <form className="space-y-8">
            {/* Email Input */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">Email</label>
              <input
                type="email"
                name="email"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-600">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-gray-800 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <Link href={'/'}>
              <button className="mt-8 w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700">
                Login
              </button>
            </Link>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
