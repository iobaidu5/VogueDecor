'use client';

import { useState } from 'react';

export default function RichTextEditor({ editorRef }) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="">
      <label htmlFor="editor" className="mb-1 text-[14px] text-[#7E7E7E]">
        Message
      </label>
      <div
        className={`overflow-hidden rounded-md border ${isFocused ? 'ring-2 ring-gray-200' : ''}`}
      >
        <textarea
          ref={editorRef}
          id="editor"
          rows={6}
          className="w-full min-h-[180px] p-4 focus:outline-none resize-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Type your message here..."
        />
      </div>
    </div>
  );
}