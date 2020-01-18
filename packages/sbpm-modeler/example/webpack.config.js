const env = process.env.NODE_ENV;

module.exports = env => {
  return require(`./webpack/webpack.${env}.js`);
};
