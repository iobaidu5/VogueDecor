// components/BundleContainer.tsx
'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const SHOP_DOMAIN = 'ai4u1b-gk.myshopify.com';

export default function BundleContainer() {
  const params = useParams();
  const handle = params.handle as string;
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Inject Bundler script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      (function() {
        function asyncLoad() {
          var urls = ["https://cdn-bundler.nice-team.net/app/js/bundler.js?shop=${SHOP_DOMAIN}"];
          for (var i = 0; i < urls.length; i++) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.async = true;
            s.src = urls[i];
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
          }
        }
        if (window.attachEvent) {
          window.attachEvent('onload', asyncLoad);
        } else {
          window.addEventListener('load', asyncLoad, false);
        }
      })();
    `;
    document.head.appendChild(script);

    // Cleanup function
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  // Listen for widget ready event
  useEffect(() => {
    const handleWidgetReady = () => setIsLoading(false);
    
    window.addEventListener('bundler:widgetReady', handleWidgetReady);
    return () => {
      window.removeEventListener('bundler:widgetReady', handleWidgetReady);
    };
  }, []);

  return (
    <div className="min-h-[500px] relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      <div 
        className={`bundler-bundle ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        data-handle={handle}
        data-container="bundler-container"
      ></div>
    </div>
  );
}