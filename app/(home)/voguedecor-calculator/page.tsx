import { redirect } from 'next/navigation';

type CalculatorRedirectProps = {
  searchParams: Promise<{ amount?: string; mode?: string }>;
};

export default async function CalculatorRedirect({ searchParams }: CalculatorRedirectProps) {
  const params = await searchParams;
  const query = new URLSearchParams();

  if (params.amount) query.set('amount', params.amount);
  if (params.mode) query.set('mode', params.mode);

  const suffix = query.toString();
  redirect(suffix ? `/financing?${suffix}` : '/financing');
}
