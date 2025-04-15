'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { ArticleAuthor } from '@src/components/features/article/ArticleAuthor';
import { ArticleLabel } from '@src/components/features/article/ArticleLabel';
import { CtfImage } from '@src/components/features/contentful';
import { FormatDate } from '@src/components/shared/format-date';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleHeroProps {
  article: PageBlogPostFieldsFragment;
  isFeatured?: boolean;
  isReversedLayout?: boolean;
  locale?: string;
}

export const ArticleHero = ({
  article,
  isFeatured,
  isReversedLayout = false,
}: ArticleHeroProps) => {
  const { t } = useTranslation();
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });
  const { title, shortDescription, publishedDate } = useContentfulLiveUpdates(article);

  return (
    <div
      className={twMerge(
        `flex flex-col overflow-hidden `,
        isReversedLayout ? 'mx-auto max-w-screen-lg lg:flex-col-reverse' : 'lg:flex-row',
      )}
    >
      <div className="flex-1 basis-1/2" {...inspectorProps({ fieldId: 'featuredImage' })}>
        {article.featuredImage && (
          <CtfImage
            nextImageProps={{
              className: 'w-full rounded-2xl object-cover object-center h-[40vh]',
              priority: true,
              sizes: undefined,
            }}
            {...article.featuredImage}
          />
        )}
      </div>

      <div className="relative mx-auto flex max-w-screen-lg flex-1 basis-1/2 flex-col justify-center py-6 px-4 lg:py-12">
        <div className="mt-8">
          <h1 {...inspectorProps({ fieldId: 'title' })}>{title}</h1>
          {shortDescription && (
            <p className="bodySecondary mt-2" {...inspectorProps({ fieldId: 'shortDescription' })}>
              {shortDescription}
            </p>
          )}
        </div>
        <div
          className={twMerge('bodySecondary textSubtle mt-2', isReversedLayout ? 'lg:hidden' : '')}
          {...inspectorProps({ fieldId: 'publishedDate' })}
        >
          <FormatDate date={publishedDate} />
        </div>
        <div className="mb-2 mt-8 flex flex-wrap items-center">
          <ArticleAuthor article={article} />
          {isFeatured && (
            <ArticleLabel
              className={twMerge(
                'ml-auto pl-2 lg:absolute lg:top-8 xl:top-12',
                isReversedLayout ? 'lg:left-6 xl:left-12' : 'lg:right-6 xl:right-12',
              )}
            >
              {t('article.featured')}
            </ArticleLabel>
          )}
          <div
            className={twMerge(
              'bodyTertiary textSubtle ml-auto hidden pl-2',
              isReversedLayout ? 'lg:block' : '',
            )}
            {...inspectorProps({ fieldId: 'publishedDate' })}
          >
            <FormatDate date={publishedDate} />
          </div>
        </div>
      </div>
    </div>
  );
};
