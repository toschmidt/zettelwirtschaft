import { GlobalAcceptMimesMiddleware, ServerLoader, ServerSettings } from '@tsed/common';
import '@tsed/swagger';
import { getBaseConfiguration } from '@zettelwirtschaft/configuration';
import { Configuration } from '@zettelwirtschaft/types';
import * as bodyParser from 'body-parser';
import compress from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import methodOverride from 'method-override';
import * as path from 'path';
import { LabelController } from './controllers/label.controller';
import { NoteController } from './controllers/note.controller';
import { TagController } from './controllers/tags.controller';

const rootDir = __dirname;
const clientDir = path.join(rootDir, '../../frontend/bundle');
const config: Configuration = getBaseConfiguration();

@ServerSettings({
  rootDir,
  acceptMimes: ['application/json'],
  httpPort: config.server.port,
  httpsPort: config.server.https,
  logger: {
    logRequest: config.server.log,
    requestFields: ['method', 'url'],
  },
  mount: {
    '/rest': [LabelController, NoteController, TagController],
  },
  swagger: [
    {
      path: '/docs',
    },
  ],
  statics: {
    '/': clientDir,
  },
})
export class Server extends ServerLoader {
  constructor(settings: any) {
    super(settings);
  }

  $beforeRoutesInit(): void | Promise<any> {
    this.use(GlobalAcceptMimesMiddleware)
      .use(cookieParser())
      .use(cors())
      .use(compress({}))
      .use(methodOverride())
      .use(bodyParser.json())
      .use(
        bodyParser.urlencoded({
          extended: true,
        }),
      );
  }

  $afterRoutesInit(): void {
    this.expressApp.get('*', (_, res) => {
      res.sendFile(path.join(clientDir, 'index.html'));
    });
  }
}
