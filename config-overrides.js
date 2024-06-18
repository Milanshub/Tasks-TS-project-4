// Import the necessary modules
const path = require('path');
const paths = require('react-scripts/config/paths');
const { overrideDevServer } = require('customize-cra');

// Update paths to use the client directory
paths.appPublic = path.resolve(__dirname, 'client/public');
paths.appHtml = path.resolve(__dirname, 'client/public/index.html');
paths.appIndexJs = path.resolve(__dirname, 'client/src/index.tsx');
paths.appSrc = path.resolve(__dirname, 'client/src');
paths.appBuild = path.resolve(__dirname, 'client/build');

/**
 * Custom development server configuration to handle deprecated middleware options
 */
const customDevServerConfig = () => (config) => {
  config.setupMiddlewares = (middlewares, devServer) => {
    // Use this function to setup custom middlewares
    if (devServer) {
      // Example of a custom middleware (you can remove or replace this example)
      devServer.app.use((req, res, next) => {
        console.log('Custom middleware running');
        next();
      });
    }

    // Fallback for deprecated onAfterSetupMiddleware
    if (typeof config.onAfterSetupMiddleware === 'function') {
      console.warn('[Deprecation] `onAfterSetupMiddleware` is deprecated. Please update to `setupMiddlewares`.');
      config.onAfterSetupMiddleware(devServer);
    }

    // Fallback for deprecated onBeforeSetupMiddleware
    if (typeof config.onBeforeSetupMiddleware === 'function') {
      console.warn('[Deprecation] `onBeforeSetupMiddleware` is deprecated. Please update to `setupMiddlewares`.');
      config.onBeforeSetupMiddleware(devServer);
    }

    return middlewares;
  };

  return config;
};

/**
 * Main override function for Webpack configuration
 * @param {object} config - The Webpack configuration object
 * @param {string} env - The current environment ('development' or 'production')
 * @returns {object} - The modified Webpack configuration object
 */
module.exports = function override(config, env) {
  // You can add custom Webpack configuration modifications here
  return config;
};

/**
 * Export the custom development server configuration
 */
module.exports.devServer = overrideDevServer(customDevServerConfig());