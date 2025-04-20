import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { twMerge } from 'tailwind-merge';

import { ImageFieldsFragment } from '@src/lib/__generated/sdk';

type NextImgExtraProps = Omit<NextImageProps, 'src' | 'alt' | 'width' | 'height' | 'fill'> &
  Partial<Pick<NextImageProps, 'width' | 'height' | 'fill'>>;

interface CtfImageProps extends Omit<ImageFieldsFragment, '__typename'> {
  nextImageProps?: NextImgExtraProps;
}

export const CtfImage = ({ url, width, height, title, nextImageProps = {} }: CtfImageProps) => {
  if (!url) return null;

  /* Desestrutura e descarta width/height vindos externamente */
  const {
    fill,
    width: overrideWidth,
    height: overrideHeight,
    className,
    sizes,
    ...rest
  } = nextImageProps;

  /* width/height “válidos” */
  const finalWidth = overrideWidth ?? width ?? undefined;
  const finalHeight = overrideHeight ?? height ?? undefined;

  /* Se não for layout fill precisamos de dimensões numéricas */
  if (!fill && (finalWidth == null || finalHeight == null)) return null;

  /* tiny‑blur placeholder */
  const blurURL = new URL(url);
  blurURL.searchParams.set('w', '10');

  return (
    <NextImage
      src={url}
      alt={title ?? ''}
      placeholder="blur"
      blurDataURL={blurURL.toString()}
      sizes={sizes ?? '(max-width: 1200px) 100vw, 50vw'}
      className={twMerge(className, 'transition-all')}
      /* Props exclusivos: ou fill, ou width/height definitivamente não‑nulos */
      {...(fill ? { fill: true } : { width: finalWidth as number, height: finalHeight as number })}
      {...rest}
    />
  );
};
