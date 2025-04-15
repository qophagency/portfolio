'use client';

import {
  useContentfulInspectorMode,
  useContentfulLiveUpdates,
} from '@contentful/live-preview/react';

import { CtfImage } from '@src/components/features/contentful';
import { PageBlogPostFieldsFragment } from '@src/lib/__generated/sdk';

interface ArticleAuthorProps {
  article: PageBlogPostFieldsFragment;
}

export const ArticleAuthor = ({ article }: ArticleAuthorProps) => {
  const { author } = useContentfulLiveUpdates(article);
  const inspectorProps = useContentfulInspectorMode({ entryId: author?.sys.id });

  return (
    <div className="flex items-center">
      <div className="mr-2 overflow-hidden rounded-full" {...inspectorProps({ fieldId: 'avatar' })}>
        {author?.avatar && (
          <CtfImage
            nextImageProps={{
              width: 40,
              height: 40,
              sizes: undefined,
              placeholder: undefined,
            }}
            {...author.avatar}
          />
        )}
      </div>
      <span
        className="bodySecondary textSubtle leading-none"
        {...inspectorProps({ fieldId: 'name' })}
      >
        {author?.name}
      </span>
    </div>
  );
};
