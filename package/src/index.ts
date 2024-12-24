import { AstroError } from 'astro/errors';

import { name as packageName } from '~/package.json';
import { CreateExports } from '~/types';
import { OptionsSchema } from '~/validators';

import type { AstroAdapter, AstroIntegration } from 'astro';

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

export default function integration(options?: Options): AstroIntegration {
  // Note: Running the parser manually instead of using `defineIntegration` because
  // of this issue comment: https://github.com/NuroDev/astro-bun/pull/11#discussion_r1896212455
  const parsedOptions = OptionsSchema.optional().safeParse(options);
  if (!parsedOptions.success)
    throw new AstroError(
      `Invalid options passed to "${packageName}" integration\n`,
      parsedOptions.error.issues.map((i) => i.message).join('\n'),
    );

  return {
    name: packageName,
    hooks: {
      // biome-ignore lint/nursery/useExplicitType: Parent inferred type.
      'astro:config:done': (params) => {
        params.setAdapter(
          getAdapter({
            ...parsedOptions.data,
            assets: params.config.build.assets,
            client: params.config.build.client?.toString(),
            host: params.config.server.host,
            port: params.config.server.port,
            server: params.config.build.server?.toString(),
          }),
        );
      },
    },
  };
}
