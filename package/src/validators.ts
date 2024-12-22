import { z } from 'zod';

export const OptionsSchema = z
  .object({
    /** TODO(@nurodev): Undocumented */
    assets: z.string(),
    /** TODO(@nurodev): Undocumented */
    client: z.string(),
    /**
     * Enable clustering for the server. (Only linux!)
     *
     * @default false
     */
    cluster: z.boolean().optional().default(false),
    /**
     * The hostname to serve the application on.
     */
    host: z.union([z.string(), z.boolean()]),
    /**
     * The port to serve the application on.
     *
     * @default 4321
     */
    port: z.coerce.number().default(4321),
    /** TODO(@nurodev): Undocumented */
    server: z.string(),
  })
  .partial();
