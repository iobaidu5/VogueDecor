import React from 'react';
import ContactHeader from './components/contactheader';
import ContactForm from './components/contactform';
import ContactLocation from './components/contactlocation';

const ContactUs = () => {
  return (
    <div className="w-full px-[20px] py-[40px] lg:px-[74px] lg:py-[40px]">
      <ContactHeader />
      <ContactForm />
      <ContactLocation />
    </div>
  );
};

export default ContactUs;