'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { Container } from '@src/components/shared/container';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="mb-4 mt-10 w-full px-4">
      <Container className="w-full rounded-3xl bg-neutral-200 p-4 md:p-16">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:gap-24">
          <div className="max-w-xl">
            <h2 className="h4 mb-4 text-4xl md:text-6xl">{t('footer.aboutUs')}</h2>
            {/* <div className="max-w-4xl">{t('footer.description')}</div> */}
          </div>
          <button className="w-full rounded-xl border border-brand-primary-500 px-8 py-4 text-2xl font-medium hover:bg-brand-primary-25 hover:text-brand-primary-600 md:w-auto">
            contato
          </button>
        </div>
        {/* <div className="mt-8 bodySecondary">
          {t('footer.powerBy')}{' '}
          <Link
            href="https://www.ryendelrocha.com"
            rel="noopener noreferrer"
            target="_blank"
            className="text-brand-primary-600"
          >
            Ryendel
          </Link>
        </div> */}
      </Container>
    </footer>
  );
};
