'use client';

import { JSX, useEffect, useState } from 'react';

export default function CookieConsent(): JSX.Element | null {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [animate, setAnimate] = useState<'enter' | 'leave' | null>(null);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
      // Delay the animation start for smooth delayed appearance
      const timer = setTimeout(() => {
        setAnimate('enter'); // trigger enter animation after delay
      }, 500);

      // Cleanup if component unmounts early
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (choice: 'accepted' | 'declined') => {
    // Trigger leave animation first
    setAnimate('leave');
    // After animation duration, hide banner and save choice
    setTimeout(() => {
      localStorage.setItem('cookieConsent', choice);
      setShowBanner(false);
      setAnimate(null);
    }, 300); // matches transition duration
  };

  if (!showBanner) return null;

  return (
    <div
      className={`
        fixed bottom-0 w-full bg-[#fff] text-white p-4 z-50 shadow-lg
        transition-transform transition-opacity duration-300 ease-in-out
        ${animate === 'enter' ? 'translate-y-0 opacity-100' : ''}
        ${animate === 'leave' ? 'translate-y-full opacity-0' : ''}
        ${animate === null ? 'translate-y-full opacity-0' : ''}
      `}
      role="dialog"
      aria-live="polite"
    >
      <div className="max-100 px-10 mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-2 md:mb-0 text-black">
          We use cookies to improve your experience on our site. By using our site, you agree to our use of cookies.
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handleConsent('accepted')}
            className="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Accept
          </button>
          <button
            onClick={() => handleConsent('declined')}
            className="bg-black hover:bg-gray-600 text-white px-4 py-2 rounded"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
