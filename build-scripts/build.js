
/**
 * a minimalist non fancy build script
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const utils = require('./utils.js')
const webpack = require('webpack')
const pluginConfig = require('../pluginrc.js')
const env = utils.resolveEnv()
const isDev = env === 'development'
const distFolder = pluginConfig.destinationFolder
const pluginFolder = path.join(distFolder, pluginConfig.extensionBundleId)
const srcFolder = pluginConfig.sourceFolder
const rootFolder = pluginConfig.root
const templatesFolder = path.join(fromRoot('assets'), 'templates')
const webpack_client_config_path = path.join(__dirname, 'webpack.client.config.js')
const webpack_rpc_client_config_path = path.join(__dirname, 'webpack.rpc_client.config.js')
utils.log_progress(`BUILD for ${env}`, 'blue')

build()

function build() {
    try {
        // delete the dist
        utils.log_progress('cleaning dist...')
        utils.deleteFolderRecursive(distFolder)
        // create dist
        fs.mkdirSync(distFolder)
        fs.mkdirSync(pluginFolder)
        // bundle the client
        utils.log_progress('bundling client...')
        execSync(`webpack --config ${webpack_client_config_path} --node-env ${env}`, { stdio: [0, 1, 2] })

        // bundle rpc
        utils.log_progress('bundling discord rpc...')
        execSync(`webpack --config ${webpack_rpc_client_config_path} --node-env ${env}`, { stdio: [0, 1, 2] })
        // copy the host code
        utils.log_progress('copying host code...')
        utils.copyRecursiveSync(fromSrc('host'), fromPlugin('host'))
        // copy the session's node modules folder
        utils.log_progress('copying rpc_client node-modules...')
        utils.copyRecursiveSync(fromSrc('rpc_client-src/node_modules'), fromPlugin('node_modules'))
        // copying libs folder
        utils.log_progress('copying libs folder...')
        utils.copyRecursiveSync(fromSrc('libs'), fromPlugin('libs'))
        // copy the index.html
        // fs.createReadStream('./src/index.html').pipe(fs.createWriteStream('./dist/index.html'));
        utils.log_progress('copying index.html...')
        utils.copyRecursiveSync(fromSrc('index.html'), fromPlugin('index.html'))
        // copy the index.html
        // fs.createReadStream('./src/index.html').pipe(fs.createWriteStream('./dist/index.html'));
        utils.log_progress('copying rpc.html...')
        utils.copyRecursiveSync(fromSrc('rpc.html'), fromPlugin('rpc.html'))
        // copy other assets
        utils.log_progress('copying Adobe assets...')
        utils.copyRecursiveSync(fromRoot('assets'), pluginFolder, ['templates'])
        // render manifest.xml
        utils.log_progress('rendering manifest.xml ...')
        var manifest_template = require(path.join(templatesFolder, 'manifest.template.xml.js'))
        var rendered_xml = manifest_template(pluginConfig)

        var xml_out_dir = path.join(pluginFolder, 'CSXS')
        fs.mkdir(xml_out_dir, { recursive: true }, (err) => { if (err) throw err; });

        var xml_out_file = path.join(pluginFolder, 'CSXS', 'manifest.xml')
        fs.writeFileSync(xml_out_file, rendered_xml, 'utf-8')

        // in dev, also render the .debug file template
        if (isDev) {
            // render .debug file
            utils.log_progress('rendering .debug file ...')
            var debug_template = require(path.join(templatesFolder, '.debug.template.js'))
            var rendered_debug = debug_template(pluginConfig)
            var debug_out_file = path.join(pluginFolder, '.debug')
            fs.writeFileSync(debug_out_file, rendered_debug, 'utf-8')
        }

        utils.log_progress('DONE', 'blue')
    } catch (err) {
        utils.log_progress(err, 'red')
    }
}

function fromDist(val) {
    return path.join(distFolder, val)
}

function fromPlugin(val) {
    return path.join(pluginFolder, val)
}

function fromSrc(val) {
    return path.join(srcFolder, val)
}

function fromRoot(val) {
    return path.join(rootFolder, val)
}
