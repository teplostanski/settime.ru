import { CurrentTime } from '../CurrentTime';
import { VerbalTime } from '../VerbalTime';
import styles from './Clock.module.css';

const Clock = () => {
  return (
    <div className={styles.root}>
      <CurrentTime />
      <VerbalTime />
    </div>
  );
};

export { Clock };
