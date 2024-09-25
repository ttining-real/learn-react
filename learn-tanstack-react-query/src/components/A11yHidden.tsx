import clsx from 'clsx';

type Props = React.PropsWithChildren<{
  as?: React.ElementType;
  focusable?: boolean;
  className?: string;
  [key: string]: unknown;
}>;

function A11yHidden({
  as: ComponentName = 'span',
  focusable = false,
  className,
  children,
  ...restProps
}: Props): JSX.Element {
  const classNames = clsx('a11yHidden', focusable && 'focusable', className);
  return (
    <ComponentName className={classNames} {...restProps}>
      {children}
    </ComponentName>
  );
}

export default A11yHidden;
