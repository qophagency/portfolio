'use client';

/*  --------------------------------------------------------------------------
    HERO COMPONENTS
    --------------------------------------------------------------------------
    1) FeaturedPostHero  →  usado na HOME / LISTAGEM como “card” destacado.
       – Foto em background (cover) com overlay escuro e texto sobre a imagem.

    2) BlogPostHero      →  usado dentro da página do post.
       – Layout empilhado: título ▸ descrição ▸ autor + data ▸ imagem (na base).

    Ambas leem os mesmos campos do Contentful e exibem “live‑updates”.
----------------------------------------------------------------------------- */

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';
import { useTranslation } from 'react-i18next';
import { twMerge } from 'tailwind-merge';

import { ArticleAuthor } from './ArticleAuthor';
import { ArticleLabel } from './ArticleLabel';
import { CtfImage } from '../contentful';
import { FormatDate } from '@src/components/shared/format-date';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */
interface ArticleHeroProps {
  article: PageBlogPostFieldsFragment;
  /** Usa o layout com imagem de fundo e overlay                       */
  isFeatured?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                              POST EM DESTAQUE                            */
/* -------------------------------------------------------------------------- */
const FeaturedPostHero = ({ article }: { article: PageBlogPostFieldsFragment }) => {
  const { t } = useTranslation();
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });
  const { title, shortDescription } = useContentfulLiveUpdates(article);

  return (
    <section
      className="relative mx-auto my-8 w-full max-w-screen-xl overflow-hidden rounded-2xl"
      {...inspectorProps({ fieldId: 'featuredImage' })}
    >
      {article.featuredImage && (
        <CtfImage
          nextImageProps={{
            fill: true,
            priority: true,
            className: 'object-cover',
            sizes: undefined,
          }}
          {...article.featuredImage}
        />
      )}

      {/* overlay + conteúdo */}
      <div className="relative z-10 flex h-[40vh] items-center justify-center bg-black/50 px-6 py-8 text-center md:h-[30vh] md:px-12">
        <div className="max-w-3xl">
          <h1 className="displaySecondary leading-tight text-neutral-50">{title}</h1>

          {shortDescription && (
            <p className="mt-4 text-lg text-neutral-200 md:mt-6 md:text-2xl">{shortDescription}</p>
          )}
        </div>

        <ArticleLabel className="absolute left-4 top-4 bg-brand-primary-600">
          {t('article.featured')}
        </ArticleLabel>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*                                BLOG POST HERO                              */
/* -------------------------------------------------------------------------- */
const BlogPostHero = ({ article }: { article: PageBlogPostFieldsFragment }) => {
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });
  const { title, shortDescription, publishedDate } = useContentfulLiveUpdates(article);

  return (
    <section className="mx-auto my-8 flex max-w-4xl flex-col overflow-hidden">
      {/* TEXTO ----------------------------------------------------------- */}
      <div className="mx-auto w-full px-0 py-6 sm:px-4 lg:px-0 lg:py-12">
        <h1 className="displaySecondary " {...inspectorProps({ fieldId: 'title' })}>
          {title}
        </h1>

        {shortDescription && (
          <p
            className="bodySecondary textSubtle mt-4 md:mt-6"
            {...inspectorProps({ fieldId: 'shortDescription' })}
          >
            {shortDescription}
          </p>
        )}

        {/* Autor + Data */}
        <div className="mt-4 flex flex-wrap items-center md:mt-6">
          <ArticleAuthor article={article} />

          <span
            className="bodyTertiary textSubtle ml-auto pl-2"
            {...inspectorProps({ fieldId: 'publishedDate' })}
          >
            <FormatDate date={publishedDate} />
          </span>
        </div>
      </div>

      {/* IMAGEM ---------------------------------------------------------- */}
      {article.featuredImage && (
        <div {...inspectorProps({ fieldId: 'featuredImage' })}>
          <CtfImage
            nextImageProps={{
              className: 'h-[40vh] w-full rounded-2xl object-cover object-center',
              priority: true,
              sizes: undefined,
            }}
            {...article.featuredImage}
          />
        </div>
      )}
    </section>
  );
};

/* -------------------------------------------------------------------------- */
/*                            PUBLIC WRAPPER COMPONENT                        */
/* -------------------------------------------------------------------------- */
export const ArticleHero = ({ article, isFeatured = false }: ArticleHeroProps) =>
  isFeatured ? <FeaturedPostHero article={article} /> : <BlogPostHero article={article} />;
