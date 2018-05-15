const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const pkg = require('./../package.json');

let webpackConfig = merge(common, {
    output: {
        filename: pkg.name + '.[name].bundle.js'
    }
});

module.exports = webpackConfig;