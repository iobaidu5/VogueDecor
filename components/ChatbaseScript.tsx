'use client'

import { useEffect } from 'react'

export default function ChatbaseScript() {
  useEffect(() => {
    if (document.getElementById('_yk1ZMfY8UhkUvFYyiich')) return

    const inlineScript = document.createElement('script')
    inlineScript.innerHTML = `
      (function(){
        if(!window.chatbase || window.chatbase("getState")!=="initialized"){
          window.chatbase = (...args) => {
            if (!window.chatbase.q) window.chatbase.q = []
            window.chatbase.q.push(args)
          };
          window.chatbase = new Proxy(window.chatbase, {
            get(target, prop) {
              if (prop === "q") return target.q
              return (...args) => target(prop, ...args)
            }
          });
        }
        const onLoad = function() {
          const script = document.createElement("script");
          script.src = "https://www.chatbase.co/embed.min.js";
          script.id = "_yk1ZMfY8UhkUvFYyiich";
          script.domain = "www.chatbase.co";
          document.body.appendChild(script);
        };
        if (document.readyState === "complete") {
          onLoad();
        } else {
          window.addEventListener("load", onLoad);
        }
      })();
    `
    document.body.appendChild(inlineScript)
  }, [])

  return null
}
