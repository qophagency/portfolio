import React, { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { ArticleTile } from '@src/components/features/article/ArticleTile';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleTileGridProps extends HTMLProps<HTMLDivElement> {
  articles?: Array<PageBlogPostFieldsFragment | null>;
}

/**
 * Gera grade responsiva de artigos.
 * – Mobile  : 1 coluna (ordem natural).
 * – Desktop : 2 colunas; esquerda 32 px acima da direita.
 */
export const ArticleTileGrid = ({ articles, className, ...props }: ArticleTileGridProps) => {
  if (!articles?.length) return null;

  /* ---------- desktop helpers ---------- */
  const leftCol = articles.filter((_, i) => i % 2 === 0);
  const rightCol = articles.filter((_, i) => i % 2 !== 0);

  return (
    <div {...props} className={twMerge('w-full', className)}>
      {/* ===== mobile: 1 coluna ===== */}
      <div className="flex flex-col gap-4 md:hidden">
        {articles.map(article => article && <ArticleTile key={article.slug} article={article} />)}
      </div>

      {/* ===== desktop: 2 colunas ===== */}
      <div className="hidden gap-4 md:flex md:flex-row">
        {/* Coluna esquerda */}
        <div className="flex w-1/2 flex-col gap-24">
          {leftCol.map(article => article && <ArticleTile key={article.slug} article={article} />)}
        </div>

        {/* Coluna direita (offset 32 px = mt‑24) */}
        <div className="mt-24 flex w-1/2 flex-col gap-24">
          {rightCol.map(article => article && <ArticleTile key={article.slug} article={article} />)}
        </div>
      </div>
    </div>
  );
};
