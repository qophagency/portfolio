'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

import { Container } from '@src/components/shared/container';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="my-10 w-full">
      <Container className="w-full rounded-3xl bg-neutral-200 p-16">
        <div className="flex flex-row items-center justify-between gap-24">
          <div className="max-w-xl">
            <h2 className="h4 mb-4 text-6xl">{t('footer.aboutUs')}</h2>
            {/* <div className="max-w-4xl">{t('footer.description')}</div> */}
          </div>
          <button className="rounded-xl border border-brand-primary-500 py-4 px-8 text-2xl font-medium hover:bg-brand-primary-25 hover:text-brand-primary-600">
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
