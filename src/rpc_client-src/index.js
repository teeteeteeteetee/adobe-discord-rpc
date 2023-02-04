/**
 * @author Tee
 */

import RichPresence from './rpc';
const csInterface = new CSInterface()

let client = require('./client.js');

// do not initialize if its ran through dynamic link (after effects)
if (csInterface.getApplicationID() === "AEFT") {
    csInterface.evalScript("app.activeViewer", x => {
        if (x === "null") client.destroy();
    });
}

client = client[csInterface.getApplicationID()]
const rpc = new RichPresence(client);

rpc.create().then(rpc.login())