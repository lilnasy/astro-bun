import { defineIntegration } from 'astro-integration-kit';
import { AstroError } from 'astro/errors';

import { name as packageName } from '~/package.json';
import { CreateExportsEnum } from '~/types.ts';
import { OptionsSchema } from '~/validators';

import type { AstroAdapter } from 'astro';

import type { Options } from '~/types.ts';

export function getAdapter(args: Options = {}): AstroAdapter {
  return {
    args,
    exports: [
      CreateExportsEnum.HANDLE,
      CreateExportsEnum.RUNNING,
      CreateExportsEnum.START,
      CreateExportsEnum.STOP,
    ] satisfies Array<CreateExportsEnum>,
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
  setup: (integration) => ({
    hooks: {
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
