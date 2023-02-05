/**
 * @author Tee
 */
"use strict";

import RichPresence from "./rpc";
//import { getState, getSmallImageText, getSmallImageKey, getLargeImageText, getPartyMax, getPartySize, getHost } from "./host"

const csInterface = new CSInterface();
const client = require("./client.js")[csInterface.getApplicationID()];

let interval = 1500;
let state, details, largeImageText, smallImageKey, smallImageText, partySize, partyMax

// do not initialize if its ran through dynamic link (after effects)
if (csInterface.getApplicationID() === "AEFT") {
    csInterface.evalScript("app.activeViewer", (x) => {
        if (x === "null") return;
    });
}

const rpc = new RichPresence(client);

rpc.create().then(rpc.login());

setInterval(() => {
    csInterface.evalScript('state()', x => state = x);
    csInterface.evalScript('details()', x => details = x);

    rpc.setActivity({
        state: state,
        details: details,
        startTimestamp: 0,
        largeImageKey: 'logo',
        largeImageText: largeImageText,
        smallImageKey: smallImageKey,
        smallImageText: smallImageText,
        partySize: partySize,
        partyMax: partyMax,
    })

}, interval);