import LegalPoliciesPage from 'components/legal/LegalPoliciesPage';
import { LegalPolicySet } from 'components/legal/types';
import policies from 'content/legal/en.json';

export default function TermsPage() {
  return <LegalPoliciesPage locale="en" policies={policies as LegalPolicySet} />;
}
