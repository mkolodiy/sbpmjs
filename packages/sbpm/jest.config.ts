import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  roots: ['<rootDir>/__test__'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
};

export default config;
