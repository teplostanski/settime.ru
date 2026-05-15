import { ClockCard } from '../ClockCard';
import { DateCard } from '../DateCard';
import { YearOrdinalsCard } from '../year-ordinals-card';
import styles from './App.module.css';

const App = () => (
  <div className={styles.container}>
    <div className={styles.grid}>
      <ClockCard className={styles.clockWidget} />
      <DateCard className={styles.dateWidget} />
      <YearOrdinalsCard className={styles.yearOrdinalsWidget} />
    </div>
  </div>
);

export { App };
