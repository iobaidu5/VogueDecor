import Link from 'next/link';

const ShippingTable = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="mx-4 flex items-center space-x-2 text-sm xs:pt-24 md:mx-16 md:pt-[120px]">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <span className="font-semibold">Shipping and Return Policy</span>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl overflow-hidden bg-white px-4 py-6 text-gray-900">
        <div className="p-4 md:p-6">
          <h1 className="mb-4 text-2xl font-bold text-red-700">SHIPPING & RETURN POLICY</h1>
          <p className="mb-4 font-semibold">Effective Date: YYYY-MM-DD</p>

          <p className="mb-4 font-bold text-red-600">
            Free shipping promotion: FREE SHIPPING ON ORDERS OVER $4,999 WITHIN CANADA. Promotion applies at checkout. Oversized/freight items, remote addresses, and certain islands may be excluded.
          </p>

          <h2 className="mt-6 mb-2 text-xl font-bold">Shipping Methods & Processing</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-sm">
            <li><strong>Methods:</strong> Standard carrier delivery for boxed items; LTL/freight or white-glove delivery for oversized or palletized furniture. Local pickup is available at our locations (see “Pickup” below).</li>
            <li><strong>Processing time:</strong> Orders are typically processed and shipped within 1–2 business days after payment and order confirmation, unless the product page or order confirmation indicates otherwise (e.g., custom or back-ordered items).</li>
            <li><strong>Oversized / Freight items:</strong> Large, palletized or white-glove items may ship via freight carriers and may incur additional fees. If your order requires freight, we will contact you with a freight quote and delivery options prior to shipping.</li>
            <li><strong>Taxes & duties:</strong> Prices do not include taxes, duties, customs brokerage, or other import fees. Customers are responsible for any applicable taxes, duties or brokerage fees on cross-border shipments.</li>
          </ul>

          <h2 className="mt-6 mb-2 text-xl font-bold">Estimated Transit Times (carrier transit only business days)</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-sm">
            <li>Ontario: 1–3 business days</li>
            <li>Quebec: 1–3 business days</li>
            <li>Alberta: 3–7 business days</li>
            <li>British Columbia: 5–9 business days</li>
            <li>Manitoba: 2–6 business days</li>
          </ul>
          <p className="mb-4 text-sm">
            Transit times are estimates and do not include processing time. Actual delivery may vary due to carrier delays, weather, holidays, remote delivery locations, or other factors outside our control.
          </p>

          <h2 className="mt-6 mb-2 text-xl font-bold">Shipping Cost Estimates (CAD)</h2>
          <p className="mb-4 text-sm">
            Final shipping charges are calculated at checkout based on item dimensions, weight, carrier service, and delivery address. Ranges may vary considerably for furniture due to size, weight, palletization, and required delivery service (curbside vs white-glove). For accurate pricing, add items to your cart and enter your shipping address at checkout. For commercial/bulk orders we provide tailored freight quotes.
          </p>

          <h2 className="mt-6 mb-2 text-xl font-bold">Pickup (Local)</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-sm">
            <li><strong>How it works:</strong> Choose “Pickup” at checkout. We will email you when your order is ready and provide pickup instructions. Bring your order confirmation and photo ID.</li>
            <li><strong>Montreal Pickup:</strong> 7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC</li>
            <li><strong>Toronto Pickup:</strong> 825 Denison St Unit 2, Markham, ON: 2 business days’ notice required for pickup at this location.</li>
          </ul>

          <h2 className="mt-6 mb-2 text-xl font-bold">Multiple-Item Orders, Consolidation & Lead Times</h2>
          <p className="mb-4 text-sm">
            Large or multi-item orders may require additional time to consolidate shipments. We will advise on estimated lead times for consolidation if applicable. For commercial or contract projects please contact us in advance so we can provide a dedicated freight quote and timeline.
          </p>

          <h2 className="mt-6 mb-2 text-xl font-bold">Delivery Requirements & Inspection</h2>
          <p className="mb-4 text-sm">
            Carriers may require a signature on delivery. If you prefer curbside delivery without signature, indicate this in your order notes or contact Customer Care — subject to carrier availability and risk acceptance.
          </p>
          <p className="mb-4 text-sm">
            Inspect shipments at delivery. If you notice visible damage, please note the damage on the carrier’s delivery receipt, take photos, and refuse delivery if safe and practical. Then contact Customer Care immediately.
          </p>
          <p className="mb-4 text-sm">
            To report damage: email <a href="mailto:info@voguedecor.com" className="underline">info@voguedecor.com</a> with your order number, brief description of the damage, and clear photos of the damaged item(s), packaging, and carrier receipt. Please submit damage reports within 48 hours of delivery to help expedite claims with the carrier.
          </p>

          <h2 className="mt-6 mb-2 text-xl font-bold">Returns, Cancellations & Refunds</h2>
          <ul className="list-disc pl-6 mb-4 space-y-2 text-sm">
            <li><strong>Standard returns window:</strong> Eligible items may be returned within 14 days from delivery, unless a different return period is stated at purchase.</li>
            <li><strong>Return shipping costs:</strong> Return shipping costs are the responsibility of the customer unless the return is due to our error (damaged/defective item or incorrect shipment).</li>
            <li><strong>Return condition:</strong> Items must be returned in their original condition and packaging (or adequately packaged for safe return) with all accessories, tags and documentation. We reserve the right to refuse returns that show excessive wear, misuse, or missing components.</li>
            <li><strong>Custom / commercial orders:</strong> Custom, made-to-order, or commercial/bulk orders may be non-returnable or subject to special cancellation fees — these terms will be disclosed at order confirmation.</li>
            <li><strong>How to start a return:</strong> Contact Customer Care at <a href="mailto:info@voguedecor.com" className="underline">info@voguedecor.com</a> with your order number and reason for return to obtain return authorization and instructions. Do not return items without authorization.</li>
            <li><strong>Refunds:</strong> Once the returned item is received and inspected, we will notify you and process any applicable refund to the original payment method. Please allow up to 7 business days after receipt for inspection and refund processing.</li>
            <li><strong>Cancellations:</strong> Orders may be cancelled prior to shipment. Cancellations for orders already in transit may incur restocking, handling or shipping charges.</li>
          </ul>

          <h2 className="mt-6 mb-2 text-xl font-bold">Returns Shipping & Restocking</h2>
          <p className="mb-4 text-sm">
            Customer is responsible for return shipping costs unless otherwise agreed. For larger furniture items returned via freight, customers are encouraged to request a freight quote and follow the return packing instructions to avoid damage in transit.
          </p>
          <p className="mb-4 text-sm">
            A restocking fee may apply for certain returns (e.g., large furniture, assembled items, or commercial orders). If applicable, restocking fees will be disclosed during the return authorization process.
          </p>

          <h2 className="mt-6 mb-2 text-xl font-bold">Warranty vs Returns</h2>
          <p className="mb-4 text-sm">
            Warranty claims for manufacturing defects are handled separately from standard returns. If you believe your item is covered by warranty (manufacturing defects within the 12-month warranty period from the delivery date), please contact Customer Care at <a href="mailto:info@voguedecor.com" className="underline">info@voguedecor.com</a> with your order number, clear photos of the defect, and a brief description of the issue. Do not initiate a standard return without prior warranty review and authorization. Once we receive your claim we will assess the issue and, if the defect is covered, arrange repair, replacement, or refund at our discretion. Warranty coverage does not include normal wear and tear, misuse, accidental damage, or unauthorized modifications.
          </p>

          <h2 className="mt-6 mb-2 text-xl font-bold">Contact for Shipping Questions & Quotes</h2>
          <p className="mb-4 text-sm">
            For shipping questions, freight quotes, white-glove arrangements, or custom delivery requests please contact Customer Care:
          </p>
          <ul className="list-disc pl-6 mb-6 space-y-2 text-sm">
            <li>Phone: +1 (888) 880-8232</li>
            <li>Email: <a href="mailto:info@voguedecor.com" className="underline">info@voguedecor.com</a></li>
            <li>Mail:
              <ul className="list-disc pl-6 mt-1">
                <li>7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC H4T 1E7</li>
                <li>825 Denison St Unit 2, Markham, ON L3R 5E4</li>
              </ul>
            </li>
          </ul>

          <p className="mb-4 text-sm">
            When requesting a freight quote, include delivery postal code, item list and dimensions/weights (if known), and any site access constraints (stairs, elevator, narrow doorways).
          </p>
        </div>
      </div>
    </>
  );
};

export default ShippingTable;