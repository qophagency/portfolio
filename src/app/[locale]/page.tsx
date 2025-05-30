import type { Metadata } from 'next';
import { draftMode } from 'next/headers';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Hero } from '@src/components/atomic/hero/hero';
import { ArticleHero, ArticleTileGrid } from '@src/components/features/article';
import { Container } from '@src/components/shared/container';
import TranslationsProvider from '@src/components/shared/i18n/TranslationProvider';
import initTranslations from '@src/i18n';
import { defaultLocale, locales } from '@src/i18n/config';
import { PageBlogPostOrder } from '@src/lib/__generated/sdk';
import { client, previewClient } from '@src/lib/client';

interface LandingPageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({ params }: LandingPageProps): Promise<Metadata> {
  const { isEnabled: preview } = draftMode();
  const gqlClient = preview ? previewClient : client;
  const landingPageData = await gqlClient.pageLanding({ locale: params.locale, preview });
  const page = landingPageData.pageLandingCollection?.items[0];

  const languages = Object.fromEntries(
    locales.map(locale => [locale, locale === defaultLocale ? '/' : `/${locale}`]),
  );
  const metadata: Metadata = {
    alternates: {
      canonical: '/',
      languages: languages,
    },
  };
  if (page?.seoFields) {
    metadata.title = page.seoFields.pageTitle;
    metadata.description = page.seoFields.pageDescription;
    metadata.robots = {
      follow: !page.seoFields.nofollow,
      index: !page.seoFields.noindex,
    };
  }

  return metadata;
}

export default async function Page({ params: { locale } }: LandingPageProps) {
  const { isEnabled: preview } = draftMode();
  const { t, resources } = await initTranslations({ locale });
  const gqlClient = preview ? previewClient : client;

  const landingPageData = await gqlClient.pageLanding({ locale, preview });
  const page = landingPageData.pageLandingCollection?.items[0];

  if (!page) {
    notFound();
  }

  const blogPostsData = await gqlClient.pageBlogPostCollection({
    limit: 6,
    locale,
    order: PageBlogPostOrder.PublishedDateDesc,
    where: {
      slug_not: page?.featuredBlogPost?.slug,
    },
    preview,
  });
  const posts = blogPostsData.pageBlogPostCollection?.items;

  if (!page?.featuredBlogPost || !posts) {
    return;
  }

  return (
    <>
      {/* @ts-ignore */}
      <TranslationsProvider locale={locale} resources={resources}>
        <Container>
          <Hero />
        </Container>

        {/* Tutorial: contentful-and-the-starter-template.md */}
        {/* Uncomment the line below to make the Greeting field available to render */}
        {/*<Container>*/}
        {/*  <div className="my-5 bg-colorTextLightest p-5 text-colorBlueLightest">{page.greeting}</div>*/}
        {/*</Container>*/}

        <Container className="my-8  max-w-screen-2xl items-center justify-center md:mb-10 lg:mb-16">
          <div className="flex w-full items-center justify-center py-8">
            <h2 className="mb-4 text-4xl md:mb-6">{t('landingPage.latestArticles')}</h2>
          </div>
          <ArticleTileGrid
            className="gap-x-8 gap-y-24 md:grid-cols-2 lg:grid-cols-2"
            articles={posts}
          />
        </Container>
        <Container className="hidden">
          <Link href={`/${page.featuredBlogPost.slug}`}>
            <ArticleHero article={page.featuredBlogPost} isFeatured />
          </Link>
        </Container>
      </TranslationsProvider>
    </>
  );
}
