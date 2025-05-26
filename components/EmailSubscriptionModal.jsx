'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import NewsLetter from '../media/png/newsletter.png';
import logo from 'media/png/logo-new.png';


export default function EmailSubscriptionModal() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Ensure this only runs after client-side mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    const user = JSON.parse(localStorage.getItem('user'));
    const isHomePage = window.location.pathname === '/';

    if (isHomePage && (!user || !user.subscribed)) {
      setShowModal(true);
    }
  }, [isMounted]);

  const handleSubscribe = () => {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    user.subscribed = true;
    user.email = email;
    localStorage.setItem('user', JSON.stringify(user));
    setShowModal(false);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  // Prevent rendering on server
  if (!isMounted || !showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-xl w-full md:max-w-4xl flex overflow-hidden h-[600px] animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
        >
          &times;
        </button>

        {/* Left Image */}
        <div className="w-1/2 relative hidden md:block">
          <Image
            src={NewsLetter}
            alt="Subscribe"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">

        <Image
            src={logo}
            alt="logo"
            objectFit="cover"
            className="d-flex justify-center mx-auto relative w-[150px] md:w-[220px] lg:w-[300px]"        
          />
          <p className="text-gray-600 mb-4 text-center">
          Subscribe to our newsletter and be the first to know about new arrivals, seasonal collections, and exclusive deals!
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 p-2 rounded w-full mb-4 mt-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            onClick={handleSubscribe}
            className="bg-black text-white py-2 rounded hover:bg-gray-900 transition duration-300"
          >
            Subscribe
          </button>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
