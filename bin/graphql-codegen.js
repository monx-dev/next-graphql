#!/usr/bin/env node

'use strict';

/* eslint-disable @typescript-eslint/no-var-requires */
const cli = require('@graphql-codegen/cli');
const path = require('path');

const src = path.join('.', 'src');
const components = path.join(src, 'components');
const graphql = path.join(src, 'graphql', 'generated');

cli.generate(
  {
    schema: path.join(src, 'graphql', 'schema.ts'),
    documents: [path.join(components, '**', '*.tsx'), path.join(components, '**', '*.tsx')],
    generates: {
      [path.join(graphql, 'types.ts')]: {
        plugins: [
          { add: "import { Context as MyContext } from '../context';" },
          'typescript',
          'typescript-resolvers',
        ],
        config: {
          contextType: 'MyContext',
        },
      },

      [path.join(graphql, 'schema.graphql')]: {
        plugins: ['schema-ast'],
        config: {
          includeDirectives: true,
        },
      },

      [path.join(graphql, 'operations.tsx')]: {
        plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
        config: {
          withHooks: true,
          withHOC: false,
          withComponent: false,
        },
      },
    },
  },
  true
);
