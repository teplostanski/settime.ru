import { type ReactNode } from 'react';
import cn from 'classnames';
import styles from './Card.module.css';

type CardProps = {
  header?: ReactNode;
  children: ReactNode;
  className?: string;
};

const Card = ({ header, children, className }: CardProps) => {
  const showHeader = header != null && header !== false;

  return (
    <article className={cn(styles.container, className)}>
      <div className={styles.inner}>
        {showHeader && header}
        <div className={styles.content}>{children}</div>
      </div>
    </article>
  );
};

export { Card, type CardProps };
