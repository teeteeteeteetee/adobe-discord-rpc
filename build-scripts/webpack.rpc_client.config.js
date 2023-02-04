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
    target: 'node',
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
                    ]
                }
            }
        }]
    }
}