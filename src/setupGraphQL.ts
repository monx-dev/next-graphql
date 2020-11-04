import { ApolloServer, Config } from 'apollo-server-micro';
import microCors from 'micro-cors';
import { IExecutableSchemaDefinition, makeExecutableSchema } from '@graphql-tools/schema';

export interface MicroCorsOptions {
  maxAge?: number;
  origin?: string;
  allowHeaders?: string[];
  allowMethods?: string[];
  exposeHeaders?: string[];
  allowCredentials?: boolean;
}

export interface SetupGraphQLConfig {
  apollo: Config;
  cors: MicroCorsOptions;
  schema?: IExecutableSchemaDefinition;
  path?: string;
}

export function setupGraphQL(config: SetupGraphQLConfig) {
  const cors = microCors(config.cors);

  if (config.schema) config.apollo.schema = makeExecutableSchema(config.schema);

  const apolloServer = new ApolloServer(config.apollo);

  return cors((req, res) => {
    if (req.method === 'OPTIONS') {
      res.end();
      return;
    }

    return apolloServer.createHandler({ path: config.path || '/api/graphql' })(req, res);
  });
}
