import { Configuration } from '@zettelwirtschaft/types';

const configuration: Configuration = {
  server: {
    port: 8000,
    https: false,
    log: true,
  },
  mongodb: {
    url: 'mongodb://localhost:27017/zettelwirtschaft',
  },
};

export default configuration;
