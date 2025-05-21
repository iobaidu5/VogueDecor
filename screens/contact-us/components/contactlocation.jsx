
const hours = [
  { day: 'Monday', time: '8AM–4PM' },
  { day: 'Tuesday', time: '8AM–4PM' },
  { day: 'Wednesday', time: '8AM–4PM' },
  { day: 'Thursday', time: '8AM–4PM' },
  { day: 'Friday', time: '8AM–4PM' },
  { day: 'Saturday', time: '9:30AM–12:30PM' },
  { day: 'Sunday', time: 'Closed' }
];
const ContactLocation = () => {
  return (
    <div className="mt-[100px]">
      <h3 className="mb-5 text-[30px] font-medium lg:text-[53px]">Find Us.</h3>
      <div className="mx-[-8px] flex w-full flex-wrap px-[10px]">
        <div className="flex w-full flex-col gap-10 md:w-6/12">
          <button className="max-w-[160px] rounded-[8px] bg-black px-4 py-2 text-white">
            Montreal
          </button>
          <div className="flex flex-col gap-2 text-[16px] font-medium">
            <h3>514.823-5595</h3>
            <h3>info@voguedecor.com</h3>
            <h3>7550 Chemin de le Cote-de-Liesse. Saint-Laurent, OC HAT TE</h3>
          </div>
          <div className="flex gap-3">
            <div className="w-full rounded-[7px] bg-[#F7F7F7] lg:w-6/12">
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
            <div className="w-full lg:w-6/12">Map</div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-10 md:w-6/12">
          {' '}
          <button className="max-w-[160px] rounded-[8px] bg-black px-4 py-2 text-white">
            Toronto
          </button>
          <div className="flex flex-col gap-2 text-[16px] font-medium">
            <h3>(416) 560-5595</h3>
            <h3>info@voguedecor.com</h3>
            <h3>825 Denison St Unit 2, Markham, ON L3R 5E4</h3>
          </div>
          <div className="flex gap-3">
            <div className="w-full rounded-[7px] bg-[#F7F7F7] lg:w-6/12">
              <table className="w-full">
                <tbody>
                  {hours?.map((item, index) => (
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
            <div className="w-full lg:w-6/12">Map</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactLocation;
