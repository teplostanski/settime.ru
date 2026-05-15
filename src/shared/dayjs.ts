import dayjs from 'dayjs/esm';
import dayOfYear from 'dayjs/esm/plugin/dayOfYear';
import isoWeek from 'dayjs/esm/plugin/isoWeek';
import ru from 'dayjs/esm/locale/ru';

dayjs.extend(dayOfYear);
dayjs.extend(isoWeek);
dayjs.locale(ru);

export { dayjs };
