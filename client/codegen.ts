import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'http://localhost:4001/',
  documents: ['src/**/*.tsx'],
  generates: {
    'src/@types/generated/': {
      preset: 'client',
      presetConfig: { gqlTagName: 'gql' },
    },
  },
};

export default config;
