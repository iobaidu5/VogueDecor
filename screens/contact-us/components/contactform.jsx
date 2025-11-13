'use client';
import RichTextEditor from '../../../components/editor';
import axios from 'axios';
import { useRef, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { useTranslation } from 'react-i18next';

const ContactForm = () => {
  const [fileName, setFileName] = useState('');
  const { t } = useTranslation('common');
  const [loading, setLoading] = useState(false);

  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const orderTypeRef = useRef(null);
  const orderNumberRef = useRef(null);
  const subjectRef = useRef(null);
  const messageRef = useRef(null);
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      setFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFileName(droppedFile.name);
      setFile(droppedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!emailRef.current?.value || !nameRef.current?.value || !subjectRef.current?.value) {
      toast.error('Please fill in required fields');
      return;
    }

    const formData = new FormData();
    formData.append('email', emailRef.current.value);
    formData.append('name', nameRef.current.value);
    formData.append('phone', phoneRef.current.value);
    formData.append('orderType', orderTypeRef.current.value);
    formData.append('orderNumber', orderNumberRef.current.value);
    formData.append('subject', subjectRef.current.value);
    
    // Get message from RichTextEditor - ensure this matches your editor component
    const messageContent = messageRef.current?.getContent?.() || 
                          messageRef.current?.value || 
                          '';
    formData.append('message', messageContent);
    
    if (file) {
      formData.append('attachment', file);
    }

    try {
      setLoading(true);
      const res = await axios.post('/api/contact', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success(res.data.message || 'Message sent successfully!');
      
      // Reset form
      e.target.reset();
      setFileName('');
      setFile(null);
      
    } catch (err) {
      console.error('Submission error:', err);
      toast.error(err.response?.data?.message || err.message || 'Sending failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <form onSubmit={handleSubmit} className="mb-6 mt-14 w-full rounded-[8px] border border-[#CDCCCC] px-2 md:px-10 py-6">
        <div className="mx-[-8px] flex flex-wrap">
          <div className="flex w-full flex-col gap-3 px-[15px] lg:w-6/12">
            <div>
              <label className="mb-0 text-[14px] text-[#7E7E7E]">{t('yourEmailAddress')}</label>
              <input 
                type="email" 
                ref={emailRef} 
                required
                className="mt-3 w-full rounded border border-gray-300 px-4 py-2" 
              />
            </div>
            <div>
              <label className="mb-0 text-[14px] text-[#7E7E7E]">{t('orderType')}</label>
              <div className="relative w-full mt-3">
                <select 
                  ref={orderTypeRef} 
                  className="text-[14px] text-[#7E7E7E] w-full cursor-pointer appearance-none rounded border border-gray-300 bg-white px-4 py-2 outline-none"
                  defaultValue=""
                >
                  <option value="" disabled className="text-[#7E7E7E]">-</option>
                  <option value="Online" className="text-[#7E7E7E]">{t('orderTypeOnline')}</option>
                  <option value="In Store" className="text-[#7E7E7E]">{t('orderTypeInStore')}</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
            <div>
              <label className="mb-0 text-[14px] text-[#7E7E7E]">{t('name')}</label>
              <input 
                type="text" 
                ref={nameRef} 
                required
                className="mt-3 w-full rounded border border-gray-300 px-4 py-2" 
              />
            </div>
            <div>
              <label className="mb-0 text-[14px] text-[#7E7E7E]">{t('phone')}</label>
              <input 
                type="tel" 
                ref={phoneRef} 
                className="mt-3 w-full rounded border border-gray-300 px-4 py-2" 
              />
            </div>
            <div>
              <label className="mb-0 text-[14px] text-[#7E7E7E]">
                {t('orderNumber')} <span className="text-gray-400">(optional)</span>
              </label>
              <input 
                type="text" 
                ref={orderNumberRef} 
                className="mt-3 w-full rounded border border-gray-300 px-4 py-2" 
              />
            </div>
          </div>
          <div className="flex w-full flex-col gap-3 px-[15px] lg:w-6/12">
            <div>
              <label className="mb-0 text-[14px] text-[#7E7E7E]">{t('subject')}</label>
              <input 
                type="text" 
                ref={subjectRef} 
                required
                className="mt-3 w-full rounded border border-gray-300 px-4 py-2" 
              />
            </div>
            <div>
              <RichTextEditor editorRef={messageRef} />
            </div>
            <div>
              <label className="mb-0 text-[14px] text-[#7E7E7E]">{t('attachments')}</label>
              <div
                onClick={handleClick}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="mt-3 w-full cursor-pointer rounded border border-gray-300 bg-white px-4 py-2 text-center text-gray-400"
              >
                {fileName || t('addOrDropFile')}
              </div>
              <input 
                ref={fileInputRef} 
                type="file" 
                className="hidden" 
                onChange={handleChange} 
              />
            </div>
          </div>
        </div>
        <div className="mt-3 flex justify-center md:justify-end">
          <button 
            type="submit"
            disabled={loading}
            className="rounded-[3px] bg-black px-4 py-2 text-white disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <>
                <svg
                  className="h-5 w-5 animate-spin text-white"
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
                <span>Sending...</span>
              </>
            ) : (
              t('submit')
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default ContactForm;