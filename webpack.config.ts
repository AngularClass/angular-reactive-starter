import 'core-js/es6';
import 'core-js/es7/reflect';
import 'ts-helpers';
// needed to create context for resolveNgRoute
/**
 * @author: @AngularClass
 */
const {
  ContextReplacementPlugin,
  HotModuleReplacementPlugin,
  DefinePlugin,
  ProgressPlugin,

  optimize: {
    CommonsChunkPlugin,
    DedupePlugin
  }

} = require('webpack');
const {ForkCheckerPlugin} = require('awesome-typescript-loader');
const resolveNgRoute = require('@angularclass/resolve-angular-routes')

const path = require('path');

function root(__path = '.') {
  return path.join(__dirname, __path);
}

// type definition for WebpackConfig at the bottom
function webpackConfig(options: EnvOptions = {}): WebpackConfig {

  const CONSTANTS = {
    ENV: JSON.stringify(options.ENV),
    HMR: options.HMR,
    PORT: 3000,
    HOST: 'localhost'
  };

  return {
    cache: true,
    // devtool: 'hidden-source-map',
    devtool: 'source-map',
    // devtool: 'cheap-module-eval-source-map',


    entry: {
      polyfills: './src/polyfills.browser',
      vendor:    './src/vendor.browser',
      main:      './src/main.browser'
    },

    output: {
      path: root('dist'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js'
    },

    module: {
      preLoaders: [
        // fix angular2
        {
          test: /systemjs_component_resolver\.js$/,
          loader: 'string-replace-loader',
          query: {
            search: 'lang_1\\.global.*[\\n\\r]\\s*\\.System.import',
            replace: 'System.import',
            flags: 'g'
          }
        }
      ],
      // End AngularSystemJS

      loaders: [
        // Support for .ts files.
        {
          test: /\.ts$/,
          loaders: [
            'awesome-typescript-loader',
            '@angularclass/conventions-loader'
          ],
          exclude: [/\.(spec|e2e|d)\.ts$/]
        },
        { test: /\.json$/, loader: 'json-loader' },
        { test: /\.html/,  loader: 'raw-loader' },
        { test: /\.css$/,  loader: 'raw-loader' },
      ]

    },


    plugins: [
      new ContextReplacementPlugin(
        /angular\/core\/src\/linker/,
        root('./src'),
        resolveNgRoute(root('./src'))
      ),
      new HotModuleReplacementPlugin(),
      new ForkCheckerPlugin(),
      new CommonsChunkPlugin({ name: ['main', 'vendor', 'polyfills'], minChunks: Infinity }),
      new DefinePlugin(CONSTANTS),
      new ProgressPlugin({})
    ],

    resolve: {
      extensions: ['', '.ts', '.js', '.json'],
    },

    devServer: {
      contentBase: './src',
      port: CONSTANTS.PORT,
      hot: CONSTANTS.HMR,
      inline: CONSTANTS.HMR,
      historyApiFallback: true
    },

    node: {
      global: 'window',
      process: true,
      Buffer: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false,
      clearTimeout: true,
      setTimeout: true
    }
  };
}


// Export
module.exports = webpackConfig;


// Types
type Entry = Array<string> | Object;

type Output = Array<string> | {
  path: string,
  filename: string
};

type EnvOptions = any;

interface WebpackConfig {
  cache?: boolean;
  target?: string;
  devtool?: string;
  entry: Entry;
  output: any;
  module?: any;
  // module?: {
  //   loaders?: Array<any>
  // };
  plugins?: Array<any>;
  resolve?: {
    root?: string;
    extensions?: Array<string>;
  };
  devServer?: {
    contentBase?: string;
    port?: number;
    historyApiFallback?: boolean;
    hot?: boolean;
    inline?: boolean;
  };
  node?: {
    process?: boolean;
    global?: boolean | string;
    Buffer?: boolean;
    crypto?: string | boolean;
    module?: boolean;
    clearImmediate?: boolean;
    setImmediate?: boolean
    clearTimeout?: boolean;
    setTimeout?: boolean
  };
}
