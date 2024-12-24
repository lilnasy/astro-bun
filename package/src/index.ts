import { defineIntegration } from 'astro-integration-kit';

import { name as packageName } from '~/package.json';
import { CreateExports } from '~/types.ts';
import { OptionsSchema } from '~/validators';

import type { AstroAdapter } from 'astro';

import type { Options } from '~/types.ts';

export function getAdapter(args: Options = {}): AstroAdapter {
  return {
    args,
    exports: [
      CreateExports.HANDLE,
      CreateExports.RUNNING,
      CreateExports.START,
      CreateExports.STOP,
    ] satisfies Array<(typeof CreateExports)[keyof typeof CreateExports]>,
    name: packageName,
    serverEntrypoint: `${packageName}/server.js`,
    supportedAstroFeatures: {
      envGetSecret: 'experimental',
      hybridOutput: 'deprecated',
      i18nDomains: 'unsupported',
      serverOutput: 'stable',
      sharpImageService: 'stable',
      staticOutput: 'stable',
    },
  };
}

export default defineIntegration({
  name: packageName,
  optionsSchema: OptionsSchema.optional(),
  // biome-ignore lint/nursery/useExplicitType: Parent inferred type.
  setup: (integration) => ({
    hooks: {
      // biome-ignore lint/nursery/useExplicitType: Parent inferred type.
      'astro:config:done': (params) => {
        params.setAdapter(
          getAdapter({
            ...integration.options,
            assets: params.config.build.assets,
            client: params.config.build.client?.toString(),
            host: params.config.server.host,
            port: params.config.server.port,
            server: params.config.build.server?.toString(),
          }),
        );
      },
    },
  }),
});
