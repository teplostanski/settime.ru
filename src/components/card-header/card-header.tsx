import { type ReactNode } from 'react';
import cn from 'classnames';
import styles from './card-header.module.css';

type CardHeaderProps = {
  children: ReactNode;
  className?: string;
};

const CardHeader = ({ children, className }: CardHeaderProps) => {
  return <header className={cn(styles.root, className)}>{children}</header>;
};

export { CardHeader, type CardHeaderProps };
