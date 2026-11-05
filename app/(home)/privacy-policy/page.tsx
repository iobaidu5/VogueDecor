import LegalDocument from 'components/legal/LegalDocument';
import { LegalPolicySet } from 'components/legal/types';
import policies from 'content/legal/en.json';

const legalPolicies = policies as LegalPolicySet;

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white px-4 pb-16 pt-10 text-[#111111] sm:px-6 md:px-10 lg:px-16">
      <div className="mx-auto max-w-[1120px]">
        <LegalDocument policy={legalPolicies.privacy} />
      </div>
    </div>
  );
}
