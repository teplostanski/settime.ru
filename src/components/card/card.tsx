import { type ReactNode } from 'react';
import cn from 'classnames';
import styles from './card.module.css';

type CardProps = {
  header?: ReactNode;
  children: ReactNode;
  className?: string;
};

const Card = ({ header, children, className }: CardProps) => (
  <article className={cn(styles.container, className)}>
    <div className={styles.inner}>
      {header != null && header}
      <div className={styles.content}>{children}</div>
    </div>
  </article>
);

export { Card, type CardProps };
