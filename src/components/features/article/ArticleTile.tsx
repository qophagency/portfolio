'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';
import Link from 'next/link';
import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';

import { CtfImage } from '@src/components/features/contentful';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleTileProps extends HTMLProps<HTMLDivElement> {
  article: PageBlogPostFieldsFragment;
}

export const ArticleTile = ({ article, className }: ArticleTileProps) => {
  const { featuredImage, title } = useContentfulLiveUpdates(article);
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });

  return (
    <Link className="flex flex-col" href={`/${article.slug}`}>
      <div className={twMerge('flex flex-1 flex-col overflow-hidden', className)}>
        {featuredImage && (
          <div {...inspectorProps({ fieldId: 'featuredImage' })}>
            <CtfImage
              nextImageProps={{ className: 'object-cover w-full rounded-3xl' }}
              {...featuredImage}
            />
          </div>
        )}
        <div className="flex flex-1 flex-col p-2">
          {title && (
            <p className="h3 mb-4 text-2xl md:mb-3" {...inspectorProps({ fieldId: 'title' })}>
              {/* Parte antes do ":" */}
              <span className="text-gray-800">{title.split(':')[0]}</span>
              {/* Coloca ":" se existir */}
              {title.includes(':') && ':'}
              {/* Parte após o ":" */}
              {title.includes(':') && <span className="text-gray-500">{title.split(':')[1]}</span>}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};
