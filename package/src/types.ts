import type { Server } from 'bun';

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
