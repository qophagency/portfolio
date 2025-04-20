'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

interface HeroProps {
  /**
   * Caso queira sobrepor o texto vindo do i18n.
   */
  title?: string;
  description?: string;
  /**
   * Prefixo das chaves no arquivo de tradução.
   * Default: "hero" → hero.title, hero.description
   */
  i18nKeyPrefix?: string;
}

export const Hero: React.FC<HeroProps> = ({ title, description, i18nKeyPrefix = 'hero' }) => {
  const { t } = useTranslation();

  const heroTitle = title ?? t(`${i18nKeyPrefix}.title`);
  const heroDescription = description ?? t(`${i18nKeyPrefix}.description`);

  return (
    <div className="mx-auto flex h-[40vh] max-w-screen-lg flex-col items-center justify-center py-8 text-center md:py-12">
      <h1 className="displayPrimary mb-4 text-gray-800">{heroTitle}</h1>
      <p className="textSubtle max-w-xl text-xl md:text-2xl">{heroDescription}</p>
    </div>
  );
};
