const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { root } = require('./helpers');

let cleanOptions = {
    allowExternal: true,    
    beforeEmit: true,    
    verbose: true
};

let webpackConfig = {
    entry: {
        app: path.resolve(__dirname, root('./src/app.ts'))
    },
    
    externals: [nodeExternals()],

    output: {
        path: path.resolve(__dirname, root('./build/'))
    },

    devtool: 'source-map',

    resolve: {
        extensions: ['.ts', '.js']
    },

    resolveLoader: {
        modules: [
            root('node_modules')
        ]
    },

    module: {
        rules: [
            {
                loader: 'awesome-typescript-loader',
                test: /\.ts$/
            }]
    },
    plugins: [
        new CleanWebpackPlugin([path.resolve(__dirname, root('./build/'))], cleanOptions)
    ],
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
        // global: true,
        // crypto: 'empty',
        // process: true,
        // module: false,
        // clearImmediate: false,
        // setImmediate: false
      }
};

module.exports = webpackConfig;
