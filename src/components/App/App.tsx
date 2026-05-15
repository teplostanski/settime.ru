import { ClockCard } from '../ClockCard';
import { DateCard } from '../DateCard';
import styles from './App.module.css';

const App = () => (
  <div className={styles.container}>
    <div className={styles.grid}>
      <div className={styles.clockWidget}>
        <ClockCard />
      </div>
      <div className={styles.dateWidget}>
        <DateCard />
      </div>
    </div>
  </div>
);

export { App };
