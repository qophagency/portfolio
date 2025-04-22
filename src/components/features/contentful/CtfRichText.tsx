/**
 * CtfRichText.tsx
 *
 * Responsável por renderizar o Rich Text do Contentful com
 * tratamento de entradas embutidas e customização de blockquotes.
 */

import React, { ReactNode } from 'react';
import { documentToReactComponents, Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, Document } from '@contentful/rich-text-types';

import { ArticleImage } from '@src/components/features/article';
import { ComponentRichImage } from '@src/lib/__generated/sdk';

/* -------------------------------------------------------------------------- */
/* Types                                                                      */
/* -------------------------------------------------------------------------- */

export type EmbeddedEntryType = ComponentRichImage | null;

export interface ContentfulRichTextInterface {
  json: Document;
  links?: {
    entries: {
      block: Array<EmbeddedEntryType>;
    };
  };
}

/* -------------------------------------------------------------------------- */
/* EmbeddedEntry resolver                                                     */
/* -------------------------------------------------------------------------- */

const EmbeddedEntry = (entry: EmbeddedEntryType) => {
  switch (entry?.__typename) {
    case 'ComponentRichImage':
      return <ArticleImage image={entry} />;
    default:
      return null;
  }
};

/* -------------------------------------------------------------------------- */
/* Rich‑text render options                                                   */
/* -------------------------------------------------------------------------- */

const contentfulBaseRichTextOptions = ({ links }: ContentfulRichTextInterface): Options => ({
  renderNode: {
    /* ------------ Embedded entries (imagens, etc.) ------------- */
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      const entry = links?.entries?.block?.find(item => item?.sys?.id === node.data.target.sys.id);

      return entry ? <EmbeddedEntry {...entry} /> : null;
    },

    /* -------------------- Blockquote --------------------------- */
    [BLOCKS.QUOTE]: (_node, children: ReactNode) => (
      <blockquote className="textSubtle my-12 border-l-4 pl-6 text-4xl font-thin italic leading-tight">
        {children}
      </blockquote>
    ),
  },
});

/* -------------------------------------------------------------------------- */
/* Component                                                                  */
/* -------------------------------------------------------------------------- */

export const CtfRichText = ({ json, links }: ContentfulRichTextInterface) => (
  <article className="bodyContent">
    {documentToReactComponents(json, contentfulBaseRichTextOptions({ json, links }))}
  </article>
);
