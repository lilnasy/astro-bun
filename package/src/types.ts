import type { Server } from 'bun';
import type { z } from 'zod';

import type { OptionsSchema } from '~/validators';

export const CreateExports = {
  HANDLE: 'handle',
  RUNNING: 'running',
  START: 'start',
  STOP: 'stop',
} as const;

export type CreateExports = {
  [CreateExports.HANDLE]: (req: Request, server: Server) => Promise<Response>;
  [CreateExports.RUNNING]: () => boolean;
  [CreateExports.START]: () => void;
  [CreateExports.STOP]: () => void;
};

export type Options = z.infer<typeof OptionsSchema>;
