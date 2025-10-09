'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import '../../../lib/i18nClient';
import { useTranslation } from 'react-i18next';

const Calculator = () => {
  const { i18n } = useTranslation('common');
  const searchParams = useSearchParams();
  const amount = searchParams.get('amount');

  return (
    <div>
      <iframe
        id="efs_object"
        style={{ width: '100%', height: '100vh', border: 'none' }}
        src={`https://www.silverchef.finance/${i18n.language}/embed/weekly-rent-widget/${amount || ''}/`}
      />
    </div>
  );
};

export default Calculator;
