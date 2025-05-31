'use client';

import Link from "next/link";
import { useTranslation } from "next-i18next";

const hours = [
  { day: 'Monday', time: '8AM–4PM' },
  { day: 'Tuesday', time: '8AM–4PM' },
  { day: 'Wednesday', time: '8AM–4PM' },
  { day: 'Thursday', time: '8AM–4PM' },
  { day: 'Friday', time: '8AM–4PM' },
  { day: 'Saturday', time: 'Closed' },
  { day: 'Sunday', time: 'Closed' }
];

const hoursToronto = [
  { day: 'Monday', time: '10AM–4PM' },
  { day: 'Tuesday', time: '10AM–4PM' },
  { day: 'Wednesday', time: '10AM–4PM' },
  { day: 'Thursday', time: '10AM–4PM' },
  { day: 'Friday', time: '10AM–4PM' },
  { day: 'Saturday', time: 'Closed' },
  { day: 'Sunday', time: 'Closed' }
];
const ContactLocation = () => {
  // const mapSrc = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  const { t, ready } = useTranslation('common');

  return (
    <div className="mt-[100px]">
      <h3 className="mb-5 text-[28px] font-medium lg:text-[53px]">{t("find_us_heading")}</h3>
      <div className="mx-[-8px] flex w-full flex-wrap">
        <div className="flex w-full flex-col gap-10 px-[12px] md:px-[20px] md:w-6/12" id="location">
          <button className="max-w-[160px] rounded-[8px] bg-black px-4 py-2 text-white">
            Montreal
          </button>
          <div className="flex flex-col gap-2 text-[14px] -mt-4 md:-mt-0 font-medium lg:text-[16px]">
            <Link href="tel:5148235595"><h3>514.823-5595</h3></Link>
            <Link href="mailto:info@voguedecor.com"><h3>info@voguedecor.com</h3></Link>
            <div className="w-full">
          <h3 className="block md:inline">{'7550 Chemin de le Cote-de-Liesse.'}</h3>
          <h3 className="block md:inline">{'Saint-Laurent, OC H4T 1E7'}</h3>
          
        </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 w-full rounded-[7px] bg-[#F7F7F7] lg:col-span-1">
              <table className="w-full">
                <tbody>
                  {hours.map((item, index) => (
                    <tr
                      key={item.day}
                      className={`${index !== hours.length - 1 ? 'border-b border-gray-200' : ''}`}
                    >
                      <td className="px-6 py-3 font-medium text-gray-700">{item.day}</td>
                      <td className="px-6 py-3 text-gray-700">{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-span-2 w-full lg:col-span-1">
              <div className="h-full w-full rounded-[7px]">
                <iframe
                  title="Static Location"
                  width="100%"
                  className="rounded-[7px]"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2797.5704233778815!2d-73.699018!3d45.4784568!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cc917ead1946ccb%3A0xb85d61581064080a!2sVOGUE%20DECOR!5e0!3m2!1sen!2s!4v1747895274112!5m2!1sen!2s"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 flex w-full flex-col gap-10 px-[20px] md:mt-0 md:w-6/12">
          {' '}
          <button className="max-w-[160px] rounded-[8px] bg-black px-4 mt-6 lg:mt-0 py-2 text-white">
            Toronto
          </button>
          <div className="flex flex-col gap-2 -mt-4 md:-mt-0 text-[16px] font-medium">
          <Link href="tel:4165605595"><h3>(416) 560-5595</h3></Link>
          <Link href="mailto:info@voguedecor.com"><h3>info@voguedecor.com</h3></Link>
            <h3>825 Denison St Unit 2, Markham, ON L3R 5E4</h3>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 w-full rounded-[7px] bg-[#F7F7F7] lg:col-span-1">
              <table className="w-full">
                <tbody>
                  {hoursToronto?.map((item, index) => (
                    <tr
                      key={item.day}
                      className={`${index !== hours.length - 1 ? 'border-b border-gray-200' : ''}`}
                    >
                      <td className="px-6 py-3 font-medium text-gray-700">{item.day}</td>
                      <td className="px-6 py-3 text-gray-700">{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-span-2 h-full w-full rounded-[7px] lg:col-span-1">
              <iframe
                title="Static Location"
                width="100%"
                height="100%"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2878.479811085141!2d-79.3370677233407!3d43.825148341292106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4d5061b435219%3A0xbc7f38ca0d7118e8!2sVOGUE%20DECOR!5e0!3m2!1sen!2s!4v1747895738858!5m2!1sen!2s"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-[7px]"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLocation;