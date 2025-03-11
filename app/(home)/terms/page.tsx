import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="bg-white pt-[120px] text-gray-900">
      <div className="mx-40 flex w-full items-center space-x-2 text-[13px]">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <span className="font-[500]">Terms</span>
      </div>
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <section className="mb-8">
            <h2 className="mb-2 text-[20px] font-[400]">Terms</h2>
            <p className="mb-4 text-[12px] text-gray-700">
              At Vogue, we are committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, and safeguard your personal information when you visit our
              website or make a purchase from us.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-2 text-[20px] font-[400]">Information We Collect</h2>
            <p className="mb-4 text-[12px] text-gray-700">
              We may collect the following types of information:
            </p>
            <ul className="mb-4 list-inside list-disc text-[12px] text-gray-700">
              <li>Personal information such as your name, email address, and phone number.</li>
              <li>Payment information such as credit card details.</li>
              <li>Browsing information such as IP address, browser type, and pages visited.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-2 text-[20px] font-[400]">How We Use Your Information</h2>
            <p className="mb-4 text-[12px] text-gray-700">We use your information to:</p>
            <ul className="mb-4 list-inside list-disc text-[12px] text-gray-700">
              <li>Process your orders and payments.</li>
              <li>Communicate with you about your orders and inquiries.</li>
              <li>Improve our website and services.</li>
              <li>Send you promotional offers and updates (if you opt-in).</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-2 text-[20px] font-[400]">Data Security</h2>
            <p className="mb-4 text-[12px] text-gray-700">
              We take data security seriously and implement industry-standard measures to protect
              your information. However, no method of transmission over the internet or electronic
              storage is 100% secure.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="mb-2 text-[20px] font-[400]">Your Rights</h2>
            <p className="mb-4 text-[12px] text-gray-700">You have the right to:</p>
            <ul className="mb-4 list-inside list-disc text-[12px] text-gray-700">
              <li>Access the personal information we hold about you.</li>
              <li>Request corrections to your personal information.</li>
              <li>Request deletion of your personal information.</li>
              <li>Opt-out of receiving promotional communications.</li>
            </ul>
          </section>
        </div>
      </main>

      {/* Footer */}
    </div>
  );
}
