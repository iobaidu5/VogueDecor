"use client";

import React from 'react'
import i18n from '../../lib/i18nClient';
import { useTranslation } from 'react-i18next';


const RelatedHeader = () => {
  const { t, ready } = useTranslation('common');
  return (
    <h2 className="mb-4 text-2xl font-medium">{t('We think you may also like')}</h2>
  )
}

export default RelatedHeader