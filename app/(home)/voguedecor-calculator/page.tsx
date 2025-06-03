'use client';

import React from 'react'
import '../../../lib/i18nClient'
import { useTranslation } from 'react-i18next';

const Calculator = () => {
  const { i18n } = useTranslation('common');

  return (
    <div className=''>
      <iframe
        style={{ width: '100%', height: '100vh' }}
        loading="lazy"
        src={`https://www.silverchef.finance/${i18n.language}_CA/embed/calculator/10000/?affiliateLink=https://go.silverchef.ca/voguedecor/calculator`}
      ></iframe>
    </div>
  );

}

export default Calculator