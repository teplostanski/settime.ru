import { ClockCard } from '../clock-card';
import { DateCard } from '../date-card';
import { UnixTimestampCard } from '../unix-timestamp-card';
import { TimezoneCard } from '../timezone-card';
import { YearOrdinalsCard } from '../year-ordinals-card';
import styles from './app.module.css';

const App = () => (
  <div className={styles.container}>
    <div className={styles.grid}>
      <ClockCard className={styles.clockWidget} />
      <DateCard className={styles.dateWidget} />
      <YearOrdinalsCard className={styles.yearOrdinalsWidget} />
      <UnixTimestampCard className={styles.unixTimestampWidget} />
      <TimezoneCard className={styles.timezoneWidget} />
    </div>
  </div>
);

export { App };
