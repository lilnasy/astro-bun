import type { Server } from 'bun';
import type { z } from 'zod';
import type { AstroConfig } from 'astro';

import type { OptionsSchema } from '~/validators';

// the options available to the user when they are adding
// the adapter to their configuration
export interface Options {
  /**
   * Create a cluster of bun servers listening on the same port,
   * and automatically load-balance incoming requests across them.
   *
   * Example:
   * ```ts
   * export default defineConfig({
   *   adapter: bun({ cluster: true })
   * })
   * ```
   *
   * Defaults to `false`
   */
  cluster?: z.infer<typeof OptionsSchema>["cluster"];
  /**
   * The path to the unix socket on which to host the server.
   *
   * This can provide better performance when Bun is running alongside
   * a local reverse proxy that supports unix sockets.
   *
   * When a unix socket is provided, Bun does not bind to a TCP port,
   * and the options and environment variables for the hostname and port
   * are ignored.
   *
   * Example:
   * ```ts
   * export default defineConfig({
   *   adapter: bun({ unix: "/tmp/my-socket.sock" })
   * })
   * ```
   */
  unix?: z.infer<typeof OptionsSchema>["unix"];
}

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

// export type Options = z.infer<typeof OptionsSchema>;

// options provided by the user combined with other
// relevant configuration picked from the integration API
export interface InternalOptions extends Options {
  /**
   * Name of the publicly exposed directory where all
   * static assets are put.
   *
   * Astro defaults to `"_astro"`.
   */
  assets: AstroConfig['build']['assets'];
  /**
   * The full file URL to where astro is configured to put
   * the client bundle and assets such as images, fonts,
   * stylesheets, and static html.
   *
   * Astro defaults to `"<project root>/dist/client/"`.
   */
  client: AstroConfig['build']['server']['href'];
  /**
   * The full file URL to where astro is configured to put
   * the server bundle.
   *
   * Astro defaults to `"<project root>/dist/server/""`.
   */
  server: AstroConfig['build']['server']['href'];
  /**
   * Network address where the astro dev server is
   * configured to listen for requests in addition to
   * `localhost`.
   *
   * Astro defaults to `false`.
   */
  host: AstroConfig['server']['host'];
  /**
   * Network port where the astro dev server is
   * configured to listen for requests.
   *
   * Astro default to `4321`.
   */
  port: AstroConfig['server']['port'];
}
