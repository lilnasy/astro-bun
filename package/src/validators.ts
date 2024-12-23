import { z } from 'zod';

export const OptionsSchema = z
  .object({
    cluster: z.boolean().optional().default(false),
    unix: z.string().optional(),
  })
  .partial();
