const path = require('path')
const root = __dirname
const srcFolder = path.join(root, "src")
const destFolder = path.join(root, "dist")
const certPath = path.join(destFolder, "cert.p12")
module.exports = {
    extensionBundleId: 'com.tee.discord-rpc',
    extensionBundlePanelId: 'com.tee.discord-rpc-panel',
    extensionBundleName: 'Discord Rich Presence',
    extensionBundleVersion: '1.0.1',
    cepVersion: '8.0',
    panelName: 'Discord Rich Presence',
    width: '350',
    height: '500',
    root: root,
    sourceFolder: srcFolder,
    destinationFolder: destFolder,
    certificate : {
        customCert: {
            path: '',
            password: 'password'
        },
        selfSign: {
            country: 'CZ',
            province: 'CZ',
            org: 'lalalala',
            name: 'example123123',
            password: '123123132321',
            locality: 'en_US',
            orgUnit: 'orgUnit',
            email: 'tee@example.tee',
            output: certPath
        }

    }

}
