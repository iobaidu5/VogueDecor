import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="overflow-hidden bg-white text-gray-900 xs:pt-24 md:pt-[120px]">
      <div className="mx-4 flex w-full items-center space-x-2 text-[13px] md:mx-16">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <span className="font-[500]">Terms</span>
      </div>
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6">
        <h1 className="mb-4 text-2xl font-bold text-red-700">Terms</h1>

        <section className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">ONLINE ACCOUNT REGISTRATION</h2>
          <p>
            To make online shopping faster and easier, you may register on the Vogue Decor website.
            As a registered customer, you only have to enter your shipping addresses and billing
            information once; they will be securely stored with us for your future use.
          </p>
          <p>
            If you are using a public computer, we strongly encourage you to{' '}
            <strong>LOG OUT</strong> at the conclusion of your session.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">EMAILS</h2>
          <p>
            You will receive promotional emails from us only if you have asked to receive them. If
            you do not want to receive email from Vogue Decor or its affiliates you can click on the
            “Unsubscribe” link at the bottom of any email.
          </p>
          <p>Please allow 3 business days for the request to process.</p>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-xl font-semibold">ACCEPTANCE</h2>
          <p>By using this website, you accept the policies set forth in this Privacy Policy.</p>
        </section>

        <section>
          <h2 className="mb-2 text-xl font-semibold">ANY QUESTIONS?</h2>
          <p>
            We’ll be happy to provide additional information or answer any questions. Please contact
            us:
          </p>
          <p className="mt-2 font-medium">Call: (514) 823-5595</p>
          <p className="mt-2 font-medium">Write:</p>
          <p className="ml-4">Customer Care</p>
          <p className="ml-4">7550 Chemin de la Côte-de-Liesse, Saint-Laurent, QC H4T 1E7</p>
          <p className="ml-4">825 Denison St Unit 2, Markham, ON L3R 5E4</p>
        </section>
      </div>

      {/* Footer */}
    </div>
  );
}
