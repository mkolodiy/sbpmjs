const sveltePreprocess = require('svelte-preprocess');
const svelte = require('rollup-plugin-svelte');
const { svelteSVG } = require('rollup-plugin-svelte-svg');

module.exports = {
  rollup(config) {
    config.plugins.push(
      svelte({
        preprocess: sveltePreprocess(),
      })
    );
    config.plugins.push(
      svelteSVG({
        svgo: {},
      })
    );
    return config;
  },
};
