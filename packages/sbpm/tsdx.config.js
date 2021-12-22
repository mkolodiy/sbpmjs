const sveltePreprocess = require('svelte-preprocess');
const svelte = require('rollup-plugin-svelte');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      svelte({
        preprocess: sveltePreprocess(),
      })
    );
    return config;
  },
};
