export type Configuration = {
  server: {
    port: number;
    https: boolean;
    log: boolean;
  };
  mongodb: {
    url: string;
  };
};
