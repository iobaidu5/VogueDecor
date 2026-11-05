import LegalPoliciesPage from 'components/legal/LegalPoliciesPage';
import { LegalPolicySet } from 'components/legal/types';
import policies from 'content/legal/es.json';

export default function TermsPage() {
  return <LegalPoliciesPage locale="es" policies={policies as LegalPolicySet} />;
}
