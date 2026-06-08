import dayjs from 'dayjs/esm';
import dayOfYear from 'dayjs/esm/plugin/dayOfYear';
import isoWeek from 'dayjs/esm/plugin/isoWeek';
import timezone from 'dayjs/esm/plugin/timezone';
import utc from 'dayjs/esm/plugin/utc';
import ru from 'dayjs/esm/locale/ru';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(dayOfYear);
dayjs.extend(isoWeek);
dayjs.locale(ru);

export { dayjs };
