module.exports = config => {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai', 'karma-typescript'],
    files: ['test/**/*.spec.ts'],
    preprocessors: {
      'test/**/*spec.ts': 'karma-typescript'
    },
    exclude: [],
    reporters: ['spec', 'karma-typescript'],
    port: 9876,
    colors: true,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true,
    browserNoActivityTimeout: 30000,
    karmaTypescriptConfig: {
      bundlerOptions: {
        transforms: [require('karma-typescript-es6-transform')()]
      },
      exclude: ['node_modules', 'example', 'lib']
    }
  });
};
