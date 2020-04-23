import { Configuration } from '@zettelwirtschaft/types';

import devConfig from './development.configuration';
import prodConfig from './production.configuration';

export function getBaseConfiguration(environment = process.env.NODE_ENV): Configuration {
  return environment === 'development' ? devConfig : prodConfig;
}
