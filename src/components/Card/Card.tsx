import { type ReactNode } from 'react';
import cn from 'classnames';
import styles from './Card.module.css';

type CardProps = {
  header?: ReactNode;
  children: ReactNode;
  className?: string;
};

const Card = ({ header, children, className }: CardProps) => {
  return (
    <div className={styles.outer}>
      <article className={cn(styles.root, className)}>
        <div className={styles.inner}>
          {header != null && header !== false ? (
            <header className={styles.header}>{header}</header>
          ) : null}
          <div className={styles.content}>{children}</div>
        </div>
      </article>
    </div>
  );
};

export { Card, type CardProps };
