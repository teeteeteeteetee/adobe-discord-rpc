/*
 * File: deploy.js
 * Project: discord-rpc
 * File Created: Saturday, 4th February 2023 9:16:06 am
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 * 
 * Last Modified: Wednesday, 10th May 2023 12:06:52 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */
/**
 * deploy in dev mode or production
 */
const { execSync } = require('child_process')
const fs = require('fs')
const os = require('os')
const path = require('path')
const utils = require('./utils.js')
const pluginConfig = require('../pluginrc.js')
const distFolder = path.join(pluginConfig.destinationFolder, pluginConfig.extensionBundleId)
const env = utils.resolveEnv()
const isDev = env === 'development'
const isWindows = utils.resolveWindows()
const extensionBundleId = pluginConfig.extensionBundleId
const resolvedTargetFolder = resolveDeploymentFolder()

deploy()

/**
 * deploy
 *
 */
function deploy() {
    utils.log_progress(`DEPLOY for ${env}`, 'blue')

    cleanTarget(resolvedTargetFolder)

    if(isDev)
        deployDevMode()
    else
        deployProdMode()

    printDeploymentFolder()

    utils.log_progress('DONE', 'blue')
}

function printDeploymentFolder() {
    utils.log_progress(`deployed to folder ${resolvedTargetFolder}`, 'green')
}

/**
 *  resolve the final deployment folder
 *
 */
function resolveDeploymentFolder() {
    return path.join(resolveExtensionFolder(), extensionBundleId)
}

/**
 *  per os Adobe extension folder
 *
 */
function resolveExtensionFolder() {
    if (isWindows) {
        const extensionsPath = os.userInfo().homedir + '\\AppData\\Roaming\\Adobe\\CEP\\extensions'
        if (!fs.existsSync(extensionsPath))
            fs.mkdirSync(extensionsPath, { recursive: true })

        return extensionsPath;
    } else {
        return path.join(os.homedir(), 'Library/Application Support/Adobe/CEP/extensions')
    }

}

/**
 * cleanTarget - clean the target folder. if it is a
 * symlink then unlink, and if it is a folder then delete.
 *
 */
function cleanTarget(target) {
    utils.log_progress('cleaning target')

    try {
        if(fs.existsSync(target) && fs.lstatSync(target).isSymbolicLink())
            fs.unlinkSync(target)
        utils.deleteFolderRecursive(target)
    } catch (err) {
        utils.log_error(err)
    }
}

/**
 * deployDevMode - just create a symlink
 *
 */
function deployDevMode() {
    try {
        utils.log_progress('patching')
        if (isWindows) {
            execSync('REG ADD HKEY_CURRENT_USER\\Software\\Adobe\\CSXS.8 /v PlayerDebugMode /t REG_SZ /d 1 /f') // CC 2018
            execSync('REG ADD HKEY_CURRENT_USER\\Software\\Adobe\\CSXS.9 /v PlayerDebugMode /t REG_SZ /d 1 /f') // CC 2019 & 2020
            execSync('REG ADD HKEY_CURRENT_USER\\Software\\Adobe\\CSXS.10 /v PlayerDebugMode /t REG_SZ /d 1 /f') // CC 2019 & 2020
            execSync('REG ADD HKEY_CURRENT_USER\\Software\\Adobe\\CSXS.11 /v PlayerDebugMode /t REG_SZ /d 1 /f') // CC 2019 & 2020
        } else {
            execSync('defaults write com.adobe.CSXS.8 PlayerDebugMode 1', { stdio: [0, 1, 2] }) // CC 2018
            execSync('defaults write com.adobe.CSXS.9 PlayerDebugMode 1', { stdio: [0, 1, 2] }) // CC 2019 & 2020
            execSync('defaults write com.adobe.CSXS.10 PlayerDebugMode 1', { stdio: [0, 1, 2] }) // CC 2020 & 2021
            execSync('defaults write com.adobe.CSXS.11 PlayerDebugMode 1', { stdio: [0, 1, 2] }) // CC 2021 & 2022
            
        }
    } catch(err) {
        utils.log_error(err)
    }

    utils.log_progress('creating symlink into extensions folder')
    try {
        var type = isWindows ? 'junction' : 'dir'

        fs.symlinkSync(distFolder, resolvedTargetFolder, type)
    } catch(err) {
        utils.log_error(err)
    }

}

/**
 * deployProdMode - copy the whole dist folder
 *
 */
function deployProdMode() {

    utils.log_progress('copying into extensions folder')
    try {
        utils.copyRecursiveSync(distFolder, resolvedTargetFolder)

    } catch(err) {
        utils.log_error(err)
    }

}
