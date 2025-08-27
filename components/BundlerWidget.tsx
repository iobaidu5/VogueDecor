// components/BundlerWidget.tsx
'use client';

import { useEffect } from 'react';

const SHOP_DOMAIN = 'ai4u1b-gk.myshopify.com'; // Replace with your store domain

export default function BundlerWidget() {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    
    // Add script content
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

    // Add to document
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}