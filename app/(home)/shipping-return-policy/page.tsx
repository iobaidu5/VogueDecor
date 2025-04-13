import Link from 'next/link';

const shippingData = [
  { state: 'Ontario', cost: '40 - 800' },
  { state: 'Quebec', cost: '40 - 800' },
  { state: 'Newfoundland & Labrador', cost: '60 - 1000' },
  { state: 'Nova Scotia', cost: '60 - 1000' },
  { state: 'Prince Edward Island', cost: '60 - 1000' },
  { state: 'New Brunswick', cost: '60 - 1000' },
  { state: 'British Columbia', cost: '100 - 1200' },
  { state: 'Alberta', cost: '100 - 1200' },
  { state: 'Saskatchewan', cost: '100 - 1200' },
  { state: 'Manitoba', cost: '100 - 1200' },
  { state: 'Hawaii', cost: '500 - 2200' }
];

const address = [
  { location: 'Ontario', time: '1 to 3 Business days' },
  { location: 'Quebec', time: '1 to 3 Business days' },
  { location: 'Alberta', time: '2 to 5 Business days' },
  { location: 'British Columbia', time: '2 to 6 Business days' },
  { location: 'Manitoba', time: '2 to 4 Business days' },
  { location: 'Rest Of USA', time: '3 to 8 Business days' }
];

const ShippingTable = () => {
  return (
    <>
      <div className="mx-4 flex items-center space-x-2 text-sm xs:pt-24 md:mx-16 md:pt-[120px]">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold">Shipping and Return Policy</span>
      </div>

      <div className="mx-auto max-w-4xl overflow-hidden bg-white px-4 py-6 text-gray-900">
        <div className="p-4 md:p-6">
          <h2 className="mb-4 text-xl font-bold md:text-2xl">Shipping Terms</h2>
          <p className="mb-4 font-bold text-red-600">
            **** Updated Promotion: FREE SHIPPING ON ORDERS OVER $1000 TO CONTINENTAL USA AND CANADA
            *****
          </p>

          <h3 className="mt-4 text-lg font-semibold">Shipping Methods:</h3>
          <ul className="ml-6 list-disc">
            <li>Delivery</li>
            <li>Shipping using our carrier</li>
            <li>Pickup</li>
          </ul>

          <h3 className="mt-4 text-lg font-semibold">Delivery Times:</h3>
          <p>1 - 2 Business Days</p>

          <h3 className="mt-4 text-lg font-semibold">Pickup Locations:</h3>
          <p>Montreal: 7550 Chemin de la Côte-de-Liesse, QC</p>
          <p>Toronto: 825 Denison St Unit 2, ON (2 business days notice required)</p>

          <h3 className="mt-4 text-lg font-semibold">Shipping Time by Location:</h3>
          <ul className="ml-6 list-disc">
            {address.map((item, index) => (
              <li key={index}>
                <strong>{item.location}:</strong> {item.time}
              </li>
            ))}
          </ul>
        </div>

        <div className="mx-auto overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">Province/State</th>
                <th className="border p-2">Shipping Cost Range ($)</th>
              </tr>
            </thead>
            <tbody>
              {shippingData.map((item, index) => (
                <tr key={index} className="text-center hover:bg-gray-100">
                  <td className="border p-2">{item.state}</td>
                  <td className="border p-2">${item.cost}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ShippingTable;
