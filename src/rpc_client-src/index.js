/*
 * File: index.js
 * Project: discord-rpc-client
 * File Created: Sunday, 2nd July 2023 1:46:25 pm
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/teeteeteeteetee
 * Discord: Tee#0001
 * 
 * Last Modified: Wednesday, 5th July 2023 12:00:41 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 *//**
 * @author Tee
 */
"use strict";

import RichPresence from "./rpc";
import isEqual from "lodash/isEqual";
import clone from "lodash/clone";
import { extensionConfiguration, getConfiguration, rpcConfiguration, setConfiguration } from "./localstorage";

const csInterface = new CSInterface();
const client = require("./client.js")[csInterface.getApplicationID()];
const event = new CSEvent("com.tee.rpc.activity", "APPLICATION")
const user = new CSEvent("com.tee.rpc.user", "APPLICATION")
const config = new CSEvent("com.tee.rpc.config", "APPLICATION");

let interval = 1000;
let props = {
    state: undefined,
    details: undefined,
    startTimestamp: new Date(),
    largeImageKey: 'logo',
    largeImageText: undefined,
    smallImageKey: undefined,
    smallImageText: undefined,
    partySize: 0,
    partyMax: 0,
}
let activity = {}
let status = true;

// do not initialize if its ran through dynamic link (after effects)
if (csInterface.getApplicationID() === "AEFT") {
    let isDynamicLink = false
    csInterface.evalScript("app.activeViewer", (x) => {
        // set dynamic link icon
        if (x === "null")
            isDynamicLink = true
        return;
    });
    if (isDynamicLink)
        throw new Error("Started as dynamic link");
}

let rpcConf = getConfiguration("rpc");
let extensionConf = getConfiguration("extension")
let configuration = {}

if(!rpcConf){
    setConfiguration("rpc", rpcConfiguration);
    rpcConf = getConfiguration("rpc");
}

if(!extensionConf){
    setConfiguration("extension", extensionConfiguration);
    extensionConf = getConfiguration("extension");
}

configuration.rpc = rpcConf
configuration.extesnion = extensionConf
config.data = configuration
csInterface.dispatchEvent(config)

csInterface.addEventListener('com.tee.rpc.config', (e) => {
    console.log(e.data)
})

const rpc = new RichPresence(client);
rpc.login()
    .then(() => {
        csInterface.addEventListener('com.tee.rpc.update', (e) => {
            activity = {}
            if(rpc.getStatus()){
                user.data = rpc.getUser()
                console.log(rpc.getUser())
                csInterface.dispatchEvent(user)
            }
            console.log(e)
        })
    })
    .then(() => main())
    .catch(console.error)
function main() {
    try {
        if (rpc.getStatus()) {
            if (!status) {
                activity = {}
                status = true
            }
            csInterface.evalScript('state()', x => props.state = x);
            csInterface.evalScript('details()', x => props.details = x);
            csInterface.evalScript('smallImageKey()', x => props.smallImageKey = x);
            csInterface.evalScript('smallImageText()', x => props.smallImageText = x);
            csInterface.evalScript('largeImageText()', x => props.largeImageText = x);
            csInterface.evalScript('partySize()', x => props.partySize = parseInt(x));
            csInterface.evalScript('partyMax()', x => props.partyMax = parseInt(x));

            if (!isEqual(activity, props)) {
                rpc.setActivity(props)
                activity = clone(props)
                event.data = {
                    ...activity,
                    name: client.name
                }
                csInterface.dispatchEvent(event)
            }

        } else {
            status = false;
        }
    } catch (err) {
        console.error(err);
    }
    setTimeout(main, interval);
}
