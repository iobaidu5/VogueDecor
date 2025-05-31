'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import NewsLetter from '../media/png/newsletter.png';
import logo from 'media/png/logo-new.png';
import { toast, Toaster } from 'sonner';
import axios from 'axios';
import i18n from '../lib/i18nClient';
import { useTranslation } from 'react-i18next';

export default function EmailSubscriptionModal() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t, ready } = useTranslation('common');

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


  const handleClose = () => {
    setShowModal(false);
  };



  const subscribe = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const res = await axios.post('/api/subscribe', { email });
      toast.success(res.data.message);

      const user = JSON.parse(localStorage.getItem('user')) || {};
      user.subscribed = true;
      user.email = email;
      localStorage.setItem('user', JSON.stringify(user));
      setLoading(false)
      setShowModal(false);
    } catch (error) {
      setLoading(false)
      console.error('Subscription error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Subscription failed');
    }
  };

  // Prevent rendering on server
  if (!isMounted || !showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg shadow-xl w-[90%] md:max-w-3xl flex flex-col sm:flex-row overflow-hidden h-[80%] sm:h-[550px] animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
          style={{ zIndex: 1000 }}
        >
          &times;
        </button>

        {/* Left Image */}
        <div className="w-full sm:w-1/2 relative md:block">
          <Image
            src={NewsLetter}
            alt="Subscribe"
            layout="sm:fill"
            objectFit="cover"
            className='h-[100%] object-cover'
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
            {t('newsletter.subscribeText')}
          </p>
          <form onSubmit={subscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-gray-300 p-2 rounded w-full mb-4 mt-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="bg-black text-white py-2 px-4 rounded hover:bg-gray-900 transition duration-300"
            >
              {loading ? (
                <svg
                  className="h-5 w-5 animate-spin text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : (
                t('subscribe')
              )}
            </button>
          </form>
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
