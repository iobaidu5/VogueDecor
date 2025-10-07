'use client';

import React from 'react'
import '../../../lib/i18nClient'
import { useTranslation } from 'react-i18next';

const Calculator = () => {
  const { i18n } = useTranslation('common');

  return (
    <div className=''>
      <iframe id="efs_object" style={{ width: '100%', height: '100vh', border: 'none;' }} src={`https://apps.econolease.com/calculator/efscalculator?lang=${i18n.language}-ca&lease=true&rental=true&loan=true&init=rental&apply=true&apply-link=https://go.econolease.com/vogue-decor-toronto/apply`}></iframe>
    </div>
  );

}

export default Calculator