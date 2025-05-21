
'use client';
import { useState } from 'react';
import { useRef } from 'react';
import RichTextEditor from '../../../components/editor';

const ContactForm = () => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState('');

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      fileInputRef.current.files = e.dataTransfer.files;
      setFileName(file.name);
    }
  };
  return (
    <form className="mb-6 w-full rounded-[8px] border border-[#CDCCCC] px-10 py-6">
      <div className="mx-[-8px] flex flex-wrap">
        <div className="flex w-full flex-col gap-3 px-[15px] lg:w-6/12">
          <div>
            <label className="text-[16px] text-[#7E7E7E]">Your email address</label>
            <input type="email" className="mt-3 w-full rounded border border-gray-300 px-4 py-2" />
          </div>
          <div>
            <label className="mb-2 text-[16px] text-[#7E7E7E]">Order Type</label>
            <select className="mt-3 w-full cursor-pointer appearance-none rounded border border-gray-300 bg-white px-4 py-2 outline-none">
              <option value="">Select order type</option>
              <option value="Online">Online</option>
              <option value="In Store">In Store</option>
            </select>
          </div>
          <div>
            <label className="mb-2 text-[16px] text-[#7E7E7E]">Name</label>
            <input type="text" className="mt-3 w-full rounded border border-gray-300 px-4 py-2" />
          </div>
          <div>
            <label className="mb-2 text-[16px] text-[#7E7E7E]">Phone</label>
            <input type="tel" className="mt-3 w-full rounded border border-gray-300 px-4 py-2" />
          </div>
          <div>
            <label className="mb-2 text-[16px] text-[#7E7E7E]">
              Order number <span className="text-gray-400">(optional)</span>
            </label>
            <input type="text" className="mt-3 w-full rounded border border-gray-300 px-4 py-2" />
          </div>
        </div>
        <div className="flex w-full flex-col gap-3 px-[15px] lg:w-6/12">
          <div>
            <label className="text-[16px] text-[#7E7E7E]">Subject</label>
            <input type="email" className="mt-3 w-full rounded border border-gray-300 px-4 py-2" />
          </div>
          <div>
            <RichTextEditor />
          </div>

          <div>
            <label className="text-[16px] text-[#7E7E7E]">Attachments</label>
            <div
              onClick={handleClick}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="mt-3 w-full cursor-pointer rounded border border-gray-300 bg-white px-4 py-2 text-center text-gray-400"
            >
              {fileName || 'Add file or drop file here'}
            </div>
            <input ref={fileInputRef} type="file" className="hidden" onChange={handleChange} />
          </div>
        </div>
      </div>
      <div className="mt-3 flex justify-end">
        <button className="rounded-[3px] bg-black px-4 py-2 text-white">Submit</button>
      </div>
    </form>
  );
};

export default ContactForm;
