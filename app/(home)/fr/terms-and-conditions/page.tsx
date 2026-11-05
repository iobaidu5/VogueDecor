import LegalPoliciesPage from 'components/legal/LegalPoliciesPage';
import { LegalPolicySet } from 'components/legal/types';
import policies from 'content/legal/fr.json';

export default function TermsPage() {
  return <LegalPoliciesPage locale="fr" policies={policies as LegalPolicySet} />;
}
