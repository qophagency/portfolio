import React from 'react';
import { HTMLProps } from 'react';
import { twMerge } from 'tailwind-merge';
import { ArticleTile } from '@src/components/features/article/ArticleTile';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleTileGridProps extends HTMLProps<HTMLDivElement> {
  articles?: Array<PageBlogPostFieldsFragment | null>;
}

/**


Componente que renderiza os artigos em duas colunas.


Na versão desktop a coluna da esquerda fica 32px acima da coluna da direita.


Os artigos são distribuídos: os de índice par na coluna esquerda

e os de índice ímpar na coluna direita.


@param articles - Lista de artigos a serem exibidos.

@param className - Classes CSS adicionais para o container.

@param props - Outras propriedades do container.


@returns JSX.Element ou null se não houver artigos.
*/
export const ArticleTileGrid = ({ articles, className, ...props }: ArticleTileGridProps) => {
  if (!articles || articles.length === 0) return null;

  // Distribuir os artigos em duas colunas.
  const leftColumnArticles = articles.filter((_article, index) => index % 2 === 0);
  const rightColumnArticles = articles.filter((_article, index) => index % 2 !== 0);

  return (
    // Se quiser usar grid em vez de flex, adicione "grid grid-cols-2" e os gaps desejados.
    <div
      {...props}
      className={twMerge(
        // Exemplo usando grid: espaçamento horizontal e vertical.
        // 'grid grid-cols-2 gap-x-8 gap-y-24',
        // Exemplo usando flex: gap entre as colunas.
        'flex flex-col gap-4 md:flex-row',
        className,
      )}
    >
      {/* Coluna esquerda */}
      <div className="w-full md:w-1/2">
        {leftColumnArticles.map((article, index) =>
          article ? (
            <div key={index} className="mb-24">
              <ArticleTile article={article} />
            </div>
          ) : null,
        )}
      </div>

      {/* Coluna direita com offset de 32px na versão desktop (mt-8 = 32px) */}
      <div className="w-full md:mt-24 md:w-1/2">
        {rightColumnArticles.map((article, index) =>
          article ? (
            <div key={index} className="mb-24">
              <ArticleTile article={article} />
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};
