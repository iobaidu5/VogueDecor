import React from 'react';
import ContactHeader from './components/contactheader';
import ContactForm from './components/contactform';
import ContactLocation from './components/contactlocation';

const ContactUs = () => {
  return (
    <div className="w-full px-[20px] py-[100px] lg:px-[74px] lg:py-[170px]">
      <ContactHeader />
      <ContactForm />
      <ContactLocation />
    </div>
  );
};

export default ContactUs;