import LegalPoliciesPage from 'components/legal/LegalPoliciesPage';
import { LegalPolicySet } from 'components/legal/types';
import policies from 'content/legal/es.json';
import spanishPrivacy from 'content/legal/es-privacy.json';

export default function TermsPage() {
  const localizedPolicies = { ...(policies as LegalPolicySet), privacy: spanishPrivacy as LegalPolicySet['privacy'] };
  return <LegalPoliciesPage locale="es" policies={localizedPolicies} />;
}
