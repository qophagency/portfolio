'use client';

import Link from 'next/link';
import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';
import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';

import { CtfImage } from '@src/components/features/contentful';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleTileProps extends HTMLProps<HTMLDivElement> {
  article: PageBlogPostFieldsFragment;
  /**
   * Variante simples: imagem acima, título abaixo
   * ‑ sem cor especial, sem split, sem meta extra.
   * Se não informado → mantém o layout original.
   */
  simple?: boolean;
}

export const ArticleTile = ({ article, className, simple = false }: ArticleTileProps) => {
  const { featuredImage, title } = useContentfulLiveUpdates(article);
  const inspector = useContentfulInspectorMode({ entryId: article.sys.id });

  /* -------- helpers -------- */
  const renderTitle = () => {
    if (!title) return null;

    if (simple) {
      return <span>{title}</span>;
    }

    // layout original com split por ":"
    const [before, after] = title.split(':');
    return (
      <>
        <span className="text-gray-800">{before}</span>
        {after && (
          <>
            :<span className="text-gray-500">{after}</span>
          </>
        )}
      </>
    );
  };

  return (
    <Link href={`/${article.slug}`} className="flex flex-col">
      <div className={twMerge('flex flex-1 flex-col overflow-hidden', className)}>
        {featuredImage && (
          <div {...inspector({ fieldId: 'featuredImage' })}>
            <CtfImage
              {...featuredImage}
              nextImageProps={{
                className: twMerge('object-cover w-full', simple ? 'rounded-xl' : 'rounded-3xl'),
              }}
            />
          </div>
        )}

        {/* Título */}
        {title && (
          <p
            {...inspector({ fieldId: 'title' })}
            className={twMerge(
              'h3 mb-4 mt-2 text-2xl md:mb-3',
              simple && 'bodySecondary', // leve ajuste
            )}
          >
            {renderTitle()}
          </p>
        )}
      </div>
    </Link>
  );
};
