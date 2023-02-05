/**
 * @author Tee
 */

"use strict";

import RichPresence from "./rpc";

const csInterface = new CSInterface();
const client = require("./client.js")[csInterface.getApplicationID()];

let interval = 1500;

// do not initialize if its ran through dynamic link (after effects)
if (csInterface.getApplicationID() === "AEFT") {
    csInterface.evalScript("app.activeViewer", (x) => {
        if (x === "null") return;
    });
}

const rpc = new RichPresence(client);

rpc.create().then(rpc.login());

setInterval(function() {
    csInterface.evalScript('state()', (x) => console.log(x));
    csInterface.evalScript('details()', (x) => console.log(x));
}, interval);