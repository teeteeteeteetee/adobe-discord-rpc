/**
 * archive, generates self signed certificate and signing a zxp package
 */
const fs = require('fs')
const path = require('path')
const zxpSignCmd = require('zxp-sign-cmd')
const utils = require('./utils.js')
const pluginConfig = require('../pluginrc.js')
const isWindows = utils.resolveWindows()
const distFolder = pluginConfig.destinationFolder
const pluginFolder = path.join(distFolder, pluginConfig.extensionBundleId)
const extensionBundleId = pluginConfig.extensionBundleId
const certificate_options = pluginConfig.certificate
const zxpFile = path.join(distFolder, pluginConfig.extensionBundleId + '.zxp')

archive()

function archive() {
    utils.log_progress('ARCHIVE', 'blue')

    prepareCert()
    .then(signPackage)
    .then(res => {
        utils.log_progress(`package is signed: ${zxpFile}`, 'green')
        utils.log_progress('DONE', 'blue')
    })
    .catch(err => {utils.log_error(err)})
}

/**
 * find a custom certificate or generate a self sign the certificate
 *
 * @return {Promise} a promise, that resolves the cert data {path, password}
 */
function prepareCert() {
    const options_custom_cert = certificate_options.customCert
    const options_self_sign = certificate_options.selfSign
    const isCustom = options_custom_cert && options_custom_cert.path.trim() !== ''
    var path='', password=''

    if(isCustom) {
        path = options_custom_cert.path
        password = options_custom_cert.password
    } else if(options_self_sign){
        path = options_self_sign.output
        password = options_self_sign.password
    }

    const isValid = path!==undefined && path.trim()!==''
    const data = {path, password}

    // on non windows, we need to change the permissions
    if(!isWindows) {
        var provider = require('zxp-provider').osx
        // for some reason the path returns quoted, so I un-quote
        var unquote = provider.substring(1, provider.length - 1)
        fs.chmodSync(unquote, '755')
    }

    return new Promise((resolve, reject) => {
        if(!isValid) {
            reject('no valid cert info')

            return
        }

        if(isCustom) {
            utils.log_progress('found a custom certificate')
            resolve(data)
        } else {
            utils.log_progress('generating a self signed certificate')
            zxpSignCmd.selfSignedCert(options_self_sign, function (error, result) {
                if(error) reject(error)
                else resolve(data)
            })

        }

    })

}

/**
 * sign the package
 *
 * @param  {{path, password}} cert description
 *
 * @return {Promise}  a promise
 */
function signPackage(cert) {
    const options = {
        input: pluginFolder,
        output: zxpFile,
        cert: cert.path,
        password: cert.password
    }

    return new Promise((resolve, reject) => {
        zxpSignCmd.sign(options, function (error, result) {
            if(error) reject(error)
            else resolve(result)

        })

    })

}
