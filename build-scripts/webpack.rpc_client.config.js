/*
 * File: webpack.rpc_client.config.js
 * Project: discord-rpc
 * File Created: Thursday, 11th May 2023 1:23:48 pm
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 * 
 * Last Modified: Sunday, 2nd July 2023 1:45:15 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */
const nodeExternals = require('webpack-node-externals')

const path = require('path');
const pluginConfig = require('../pluginrc.js')
// const distFolder = pluginConfig.destinationFolder
const distFolder = path.join(pluginConfig.destinationFolder, pluginConfig.extensionBundleId)
const srcFolder = pluginConfig.sourceFolder
const CLIENT_DIST_PATH = path.resolve(distFolder, 'rpc_client-dist')
const CLIENT_DIST_SRC = path.resolve(distFolder, 'rpc_client-src')
const ENTRY_POINT_CLIENT_PATH = path.join(srcFolder, 'rpc_client-src/index.js')

module.exports = {
    mode: 'development',
    target: 'node7.0',
    // target: 'node',
    externals: [nodeExternals({modulesDir: path.join(CLIENT_DIST_SRC, 'node_modules')})],
    entry: ['babel-polyfill', ENTRY_POINT_CLIENT_PATH],
    output: {
        path: CLIENT_DIST_PATH,
        filename: 'bundle.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['env', {
                            'targets': {
                                'node': 'current'
                            }
                        }]
                    ],
                },
            }
        }]
    }
}