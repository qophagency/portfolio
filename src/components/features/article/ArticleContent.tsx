'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';

import { PageBlogPostFieldsFragment, ComponentRichImage } from '@src/lib/__generated/sdk';
import { CtfRichText, EmbeddedEntryType } from '@src/components/features/contentful';

interface ArticleContentProps {
  article: PageBlogPostFieldsFragment;
}

/**
 * Garante, em tempo de tipos, que o entry é um ComponentRichImage
 * (o único EmbeddedEntry atualmente suportado pelo CtfRichText).
 */
const isRichImage = (entry: unknown): entry is ComponentRichImage =>
  !!entry && (entry as { __typename?: string }).__typename === 'ComponentRichImage';

export const ArticleContent = ({ article }: ArticleContentProps) => {
  const { content } = useContentfulLiveUpdates(article);
  const inspectorProps = useContentfulInspectorMode({ entryId: article.sys.id });

  /**
   * Converte os links vindos do Contentful para o formato aceito
   * pelo CtfRichText – somente blocos de imagem.
   */
  const richTextLinks = content?.links
    ? {
        entries: {
          block: content.links.entries.block.filter(isRichImage) as EmbeddedEntryType[],
        },
      }
    : undefined;

  return (
    <div className="max-w-screen-lg" {...inspectorProps({ fieldId: 'content' })}>
      <CtfRichText json={content?.json} links={richTextLinks} />
    </div>
  );
};
