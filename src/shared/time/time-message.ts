import { z } from 'zod';

const timeMessageSchema = z.object({
  type: z.literal('unix_timestamp'),
  value: z.number(),
});

type TimeMessage = z.infer<typeof timeMessageSchema>;

const ClientTimeMessage = {
  Refresh: { type: 'refresh' },
} as const;

const parseTimeMessage = (data: unknown): TimeMessage | null => {
  const result = timeMessageSchema.safeParse(data);

  return result.success ? result.data : null;
};

export { ClientTimeMessage, parseTimeMessage };
export { type TimeMessage };
