import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="overflow-hidden bg-white text-gray-900 xs:pt-24 md:pt-[120px]">
      <div className="mx-4 flex w-full items-center space-x-2 text-[13px] md:mx-16">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <span className="font-[500]">Privacy Policy</span>
      </div>
      <div className="mx-auto max-w-4xl bg-white p-6 text-gray-800">
        <h1 className="mb-4 text-2xl font-bold text-red-700">PRIVACY POLICY</h1>
        <section className="mb-6">
          <h2 className="mb-2 text-xl font-bold">Types of Data collected</h2>
          <p className="mb-2 text-sm">
            Among the types of Personal Data that this Application collects, by itself or through
            third parties, there are: email address; first name; last name.
          </p>
          <p className="mb-2 text-sm">
            Complete details on each type of Personal Data collected are provided in the dedicated
            sections of this privacy policy or by specific explanation texts displayed prior to the
            data collection.
          </p>
          <p className="mb-2 text-sm">
            Personal Data may be freely provided by the User, or, in case of Usage Data, collected
            automatically when using this Application.
          </p>
          <p className="mb-2 text-sm">
            Unless specified otherwise, all Data requested by this Application is mandatory and
            failure to provide this Data may make it impossible for this Application to provide its
            services. In cases where this Application specifically states that some Data is not
            mandatory, Users are free not to communicate this Data without consequences to the
            availability or the functioning of the Service.
          </p>
          <p className="mb-2 text-sm">
            Users who are uncertain about which Personal Data is mandatory are welcome to contact
            the Owner.
          </p>
          <p className="mb-2 text-sm">
            Any use of Cookies – or of other tracking tools – by this Application or by the owners
            of third-party services used by this Application serves the purpose of providing the
            Service required by the User, in addition to any other purposes described in the present
            document and in the Cookie Policy, if available.
          </p>
        </section>

        <section className="mb-6">
          <p className="mb-2 text-sm">
            Users are responsible for any third-party Personal Data obtained, published or shared
            through this Application and confirm that they have the third party's consent to provide
            the Data to the Owner.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="mb-2 text-xl font-bold">Mode and place of processing the Data</h2>
          <h3 className="mb-1 text-lg font-semibold">Methods of processing</h3>
          <p className="mb-2 text-sm">
            The Owner takes appropriate security measures to prevent unauthorized access,
            disclosure, modification, or unauthorized destruction of the Data.
          </p>
          <p className="mb-2 text-sm">
            The Data processing is carried out using computers and/or IT enabled tools, following
            organizational procedures and modes strictly related to the purposes indicated. In
            addition to the Owner, in some cases, the Data may be accessible to certain types of
            persons in charge, involved with the operation of this Application (administration,
            sales, marketing, legal, system administration) or external parties (such as third-party
            technical service providers, mail carriers, hosting providers, IT companies,
            communications agencies) appointed, if necessary, as Data Processors by the Owner. The
            updated list of these parties may be requested from the Owner at any time.
          </p>
        </section>

        <section className="mb-6">
          <h3 className="mb-1 text-lg font-semibold">Legal basis of processing</h3>
          <p className="mb-2 text-sm">
            The Owner may process Personal Data relating to Users if one of the following applies:
          </p>
          <ul className="mb-2 list-disc pl-6 text-sm">
            <li>
              Users have given their consent for one or more specific purposes. Note: Under some
              legislations the Owner may be allowed to process Personal Data until the User objects
              to such processing ("opt-out"), without having to rely on consent or any other of the
              following legal bases. This, however, does not apply, whenever the processing of
              Personal Data is subject to European data protection law;
            </li>
            <li>
              provision of Data is necessary for the performance of an agreement with the User
              and/or for any pre-contractual obligations thereof;
            </li>
            <li>
              processing is necessary for compliance with a legal obligation to which the Owner is
              subject;
            </li>
            <li>
              processing is related to a task that is carried out in the public interest or in the
              exercise of official authority vested in the Owner;
            </li>

            <li>
              processing is necessary for the purposes of the legitimate interests pursued by the
              Owner or by a third party.
            </li>
          </ul>
        </section>

        <p className="mb-4">
          In any case, the Owner will gladly help to clarify the specific legal basis that applies
          to the processing, and in particular whether the provision of Personal Data is a statutory
          or contractual requirement, or a requirement necessary to enter into a contract.
        </p>

        <h2 className="mt-4 text-xl font-semibold">Data Retention</h2>
        <p className="mb-4">
          Personal Data collected for purposes related to the performance of a contract between the
          Owner and the User shall be retained until such contract has been fully performed.
        </p>
        <p className="mb-4">
          Personal Data collected for the purposes of the Owner’s legitimate interests shall be
          retained as long as needed to fulfill such purposes. Users may find specific information
          regarding the legitimate interests pursued by the Owner within the relevant sections of
          this document or by contacting the Owner.
        </p>

        <h2 className="mt-4 text-xl font-semibold">User Rights</h2>
        <ul className="list-inside list-disc space-y-2">
          <li>
            <span className="font-semibold">Withdraw their consent:</span> Users have the right to
            withdraw consent where they have previously given their consent to the processing of
            their Personal Data.
          </li>
          <li>
            <span className="font-semibold">Object to processing of their Data:</span> Users have
            the right to object to the processing of their Data if the processing is carried out on
            a legal basis other than consent.
          </li>
          <li>
            <span className="font-semibold">Access their Data:</span> Users have the right to learn
            if Data is being processed by the Owner and obtain a copy of the Data undergoing
            processing.
          </li>
          <li>
            <span className="font-semibold">Verify and seek rectification:</span> Users have the
            right to verify the accuracy of their Data and ask for it to be updated or corrected.
          </li>
          <li>
            <span className="font-semibold">Restrict the processing of their Data:</span> Under
            certain circumstances, users can restrict the processing of their Data.
          </li>
          <li>
            <span className="font-semibold">Have their Personal Data deleted:</span> Users have the
            right to obtain the erasure of their Data from the Owner under certain conditions.
          </li>
          <li>
            <span className="font-semibold">Receive their Data and have it transferred:</span> Users
            can receive their Data in a structured format and transfer it to another controller.
          </li>
          <li>
            <span className="font-semibold">Lodge a complaint:</span> Users can bring a claim before
            their competent data protection authority.
          </li>
        </ul>

        <h2 className="mb-2 mt-4 text-xl font-semibold">Legal Use</h2>
        <p>
          The User’s Personal Data may be used for legal purposes by the Owner in Court or in the
          stages leading to possible legal action arising from improper use of this Application or
          the related Services.
        </p>
      </div>

      {/* Footer */}
    </div>
  );
}
