import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import cn from 'classnames';
import type { TimezoneOption } from '../../shared/time/timezones';
import { getTimezoneLabel } from '../../shared/time/timezones';
import styles from './timezone-card.module.css';

type TimezoneSelectProps = {
  value: string;
  options: readonly TimezoneOption[];
  onChange: (value: string) => void;
  'aria-label': string;
};

const TimezoneSelect = ({
  value,
  options,
  onChange,
  'aria-label': ariaLabel,
}: TimezoneSelectProps) => {
  const selectedLabel = getTimezoneLabel(value);

  return (
    <Listbox value={value} onChange={onChange}>
      <div className={styles.selectRoot}>
        <ListboxButton className={styles.trigger} aria-label={ariaLabel}>
          <span className={cn('content', styles.triggerLabel)}>{selectedLabel}</span>
          <span className={styles.triggerIcon} aria-hidden="true" />
        </ListboxButton>

        <ListboxOptions
          as="ul"
          portal
          anchor={{ to: 'bottom start', gap: 10, padding: 8 }}
          className={styles.listbox}
        >
          {options.map((option) => (
            <ListboxOption
              key={option.id}
              as="li"
              value={option.id}
              className={({ focus, selected }) =>
                cn('content', styles.option, {
                  [styles.optionActive]: focus,
                  [styles.optionSelected]: selected,
                })
              }
            >
              {option.label}
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export { TimezoneSelect };
