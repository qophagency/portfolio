import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { ArticleTile } from './ArticleTile';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleTileGridProps extends HTMLProps<HTMLDivElement> {
  articles?: Array<PageBlogPostFieldsFragment | null>;
  /**
   * Variante “inline” → todos os tiles em linha,
   * com flex‑wrap para quebrar quando faltar espaço.
   * Se não informado → mantém grade original 1‑col (m) / 2‑col (d).
   */
  inline?: boolean;
  /** Repassa para cada <ArticleTile /> */
  simpleTile?: boolean;
}

export const ArticleTileGrid = ({
  articles,
  className,
  inline = false,
  simpleTile = false,
  ...props
}: ArticleTileGridProps) => {
  if (!articles?.length) return null;

  /* ===== variante INLINE ===== */
  if (inline) {
    return (
      <div
        {...props}
        /* 1 col (xs) / 2 col (sm) / 3 col (md) / 4 col (lg+) */
        className={twMerge(
          'grid w-full grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
          className,
        )}
      >
        {articles.map(
          article =>
            article && (
              <ArticleTile
                key={article.slug}
                article={article}
                simple={simpleTile}
                /* ocupa 100 % da célula */
                className="w-full"
              />
            ),
        )}
      </div>
    );
  }

  /* ===== layout original (NÃO alterado) ===== */
  const leftCol = articles.filter((_, i) => i % 2 === 0);
  const rightCol = articles.filter((_, i) => i % 2 !== 0);

  return (
    <div {...props} className={twMerge('w-full', className)}>
      {/* Mobile: 1 col */}
      <div className="flex flex-col gap-8 md:hidden">
        {articles.map(article => article && <ArticleTile key={article.slug} article={article} />)}
      </div>

      {/* Desktop: 2 col com offset */}
      <div className="hidden gap-8 md:flex md:flex-row">
        <div className="flex w-1/2 flex-col gap-24">
          {leftCol.map(article => article && <ArticleTile key={article.slug} article={article} />)}
        </div>

        <div className="mt-24 flex w-1/2 flex-col gap-24">
          {rightCol.map(article => article && <ArticleTile key={article.slug} article={article} />)}
        </div>
      </div>
    </div>
  );
};
