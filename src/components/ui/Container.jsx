import { cx } from '../../utils/cx';

export default function Container({ as: Component = 'div', className, children, ...props }) {
  return (
    <Component
      className={cx('mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
