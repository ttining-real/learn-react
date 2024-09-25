import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { type PropsWithChildren } from 'react';
import ReactQueryLogo from '@/assets/react-query-logo.svg?react';

type Props = PropsWithChildren<{
  title?: string;
  className?: string;
  size?: number;
  [key: string]: unknown;
}>;

function HomeLink({
  title,
  className = '',
  size = 38,
  children,
  ...restProps
}: Props): JSX.Element {
  
  const linkClasses = clsx(
    'inline-flex gap-2 items-center p-1 text-base font-bold text-red-600/90',
    className
  );

  return (
    <Link to="/" className={linkClasses} title="홈" aria-label='홈' {...restProps}>
      <ReactQueryLogo aria-hidden="true" title={title} height={size} width={size} />
      {children}
    </Link>
  );
}

export default HomeLink;
