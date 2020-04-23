import { $log, ServerLoader } from '@tsed/common';

import { Server } from './server';

export async function bootstrap(): Promise<void> {
  try {
    $log.debug('Start server...');
    const server = await ServerLoader.bootstrap(Server, {});

    await server.listen();
    $log.debug('Server initialized');
  } catch (er) {
    $log.error(er);
  }
}
