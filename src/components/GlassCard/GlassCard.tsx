import type { ReactNode } from 'react';
import cn from 'classnames';
import styles from './GlassCard.module.css';

type GlassCardProps = {
  /** Заголовок карточки (например словесное время) */
  header: ReactNode;
  /** Основной контент */
  children: ReactNode;
  className?: string;
};

const GlassCard = ({ header, children, className }: GlassCardProps) => (
  <div className={styles.cqHost}>
    <article className={cn(styles.root, className)}>
      <div className={styles.cardCq}>
        <header className={styles.header}>{header}</header>
        <div className={styles.body}>{children}</div>
      </div>
    </article>
  </div>
);

export { GlassCard, type GlassCardProps };
