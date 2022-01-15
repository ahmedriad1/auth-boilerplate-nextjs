import { isBrowser } from '@/helpers/functions';
import Image from 'next/image';

const shimmer = (w, h) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = str =>
  isBrowser() ? window.btoa(str) : Buffer.from(str).toString('base64');

interface LazyImageProps {
  width: number;
  height: number;
  src: string;
  className: string;
  alt: string;
}

const LazyImage: React.FC<LazyImageProps> = props => {
  if (props.width < 40 || props.height < 40) return <Image {...props} />;

  return (
    <Image
      {...props}
      placeholder='blur'
      blurDataURL={`data:image/svg+xml;base64,${toBase64(
        shimmer(props.width, props.height),
      )}`}
    />
  );
};

export default LazyImage;
