'use client';

import { useState, useRef } from 'react';
import {
  FaBold,
  FaItalic,
  FaLink,
  FaListUl,
  FaListOl,
  FaQuoteRight,
  FaHeading
} from 'react-icons/fa';

export default function RichTextEditor() {
  const editorRef = useRef();
  const [isFocused, setIsFocused] = useState(false);

  const handleFormat = (command, value) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
  };

  const formatBold = () => handleFormat('bold');
  const formatItalic = () => handleFormat('italic');
  const formatBulletList = () => handleFormat('insertUnorderedList');
  const formatNumberedList = () => handleFormat('insertOrderedList');
  const formatLink = () => {
    const url = prompt('Enter the URL:');
    if (url) handleFormat('createLink', url);
  };
  const formatQuote = () => handleFormat('formatBlock', 'blockquote');
  const formatHeading = () => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const selectedText = range.toString();

      if (selectedText) {
        document.execCommand('formatBlock', false, 'h3');
      }
    }
  };

  return (
    <div className="">
      <label htmlFor="editor" className="mb-1 text-[14px] text-[#7E7E7E]">
        Message
      </label>
      <div
        className={`overflow-hidden rounded-md border ${isFocused ? 'ring-2 ring-gray-200' : ''}`}
      >
        <div className="flex items-center gap-1 border-b bg-white p-2">
          <button
            onClick={formatHeading}
            className="rounded p-1.5 hover:bg-gray-100"
            title="Heading"
          >
            <FaHeading size={18} />
          </button>
          <button onClick={formatBold} className="rounded p-1.5 hover:bg-gray-100" title="Bold">
            <FaBold size={18} />
          </button>
          <button onClick={formatItalic} className="rounded p-1.5 hover:bg-gray-100" title="Italic">
            <FaItalic size={18} />
          </button>
          <button
            onClick={formatBulletList}
            className="rounded p-1.5 hover:bg-gray-100"
            title="Bullet List"
          >
            <FaListUl size={18} />
          </button>
          <button
            onClick={formatNumberedList}
            className="rounded p-1.5 hover:bg-gray-100"
            title="Numbered List"
          >
            <FaListOl size={18} />
          </button>
          <button onClick={formatLink} className="rounded p-1.5 hover:bg-gray-100" title="Link">
            <FaLink size={18} />
          </button>
          <button onClick={formatQuote} className="rounded p-1.5 hover:bg-gray-100" title="Quote">
            <FaQuoteRight size={18} />
          </button>
        </div>
        <div
          ref={editorRef}
          id="editor"
          contentEditable
          className="min-h-[180px] p-4 focus:outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
}