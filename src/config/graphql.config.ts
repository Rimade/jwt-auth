import type { GqlModuleOptions } from '@nestjs/graphql';

export function getGraphQLConfig(): GqlModuleOptions {
  return {
    autoSchemaFile: true,
    sortSchema: true,
  };
}
