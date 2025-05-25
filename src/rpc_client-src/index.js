/*
 * File: index.js
 * Project: discord-rpc-client
 * File Created: Sunday, 2nd July 2023 1:46:25 pm
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/teeteeteeteetee
 * Discord: Tee#0001
 * 
 * Last Modified: Sunday, 7th April 2024 12:30:53 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Demon Cat
 */

"use strict";

import RichPresence from "./rpc";
import isEqual from "lodash/isEqual";
import clone from "lodash/clone";
import { extensionConfigurationTemplate, getConfiguration, getConfigurations, resetConfiguration, rpcConfigurationTemplate, setConfiguration } from "./localstorage";

const csInterface = new CSInterface();
const client = require("./client.js")[csInterface.getApplicationID()];
const rpc = new RichPresence(client);

const activity = new CSEvent("com.tee.rpc.activity", "APPLICATION");
const user = new CSEvent("com.tee.rpc.user", "APPLICATION");
const config = new CSEvent("com.tee.rpc.config", "APPLICATION");
const logger = new CSEvent("com.tee.rpc.logger", "APPLICATION");

const props = {
    state: undefined,
    details: undefined,
    startTimestamp: new Date(),
    largeImageKey: 'logo2',
    largeImageText: undefined,
    smallImageKey: undefined,
    smallImageText: undefined,
    partySize: 0,
    partyMax: 0,
}

let presence = {}
let configurations = getConfigurations()
let status = true;
let interval = 1000;

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
    // TODO: handle dunamic link
        throw new Error("Started as dynamic link");
}

csInterface.addEventListener('com.tee.rpc.reset', () => {
    console.log("reset")
    rpc.destroy()
    resetConfiguration()
    window.location.reload()
})

csInterface.addEventListener('com.tee.rpc.config', (e) => {
    console.log(e.data)

    for (const [key, value] of Object.entries(e.data)){
        console.log(key)
        setConfiguration(key, value)
    }
    configurations = getConfigurations()
    presence = {}
})

if (!configurations.rpc) {
    setConfiguration("rpc", rpcConfigurationTemplate);
    configurations.rpc = getConfiguration("rpc");
}

if (!configurations.extension) {
    setConfiguration("extension", extensionConfigurationTemplate);
    configurations.extension = getConfiguration("extension");
}

csInterface.dispatchEvent(configurations)
console.log("dispatching configuration")
console.log(configurations)

rpc.login()
    .then(() => {
        csInterface.addEventListener('com.tee.rpc.update', (e) => {
            presence = {}
            if (rpc.getStatus()) {
                user.data = rpc.getUser()
                console.log(rpc.getUser())
                csInterface.dispatchEvent(user)
            }
            console.log(configurations)
            csInterface.dispatchEvent(configurations)

        })
    })
    .then(() => main())
    .catch(console.error)
function main() {
    try {
        if (rpc.getStatus()) {
            if (!status) {
                presence = {}
                status = true
            }


            console.log(configurations.rpc)

            callScript('state()')
            callScript('details()')
            callScript('smallImageKey()')
            callScript('smallImageText()')
            // callScript('largeImageKey()')
            callScript('largeImageText()')
            callScriptNumber('partySize()')
            callScriptNumber('partyMax()')
            // props.largeImageKey = configurations.extension[largeImageKey].value
            if(configurations.rpc.largeImageKey.value){
                switch(configurations.rpc.largeImageKey.value){
                    case "old":
                        props.largeImageKey = 'logo'
                        break;
                    case "new":
                        props.largeImageKey = 'logo2'
                        break;
                    default:
                        props.largeImageKey = configurations.rpc.largeImageKey.value
                }
            }else{
                props.largeImageKey = 'logo2'
            }

            console.log(props)

            if (!isEqual(presence, props)) {
                rpc.setActivity(props)
                presence = clone(props)
                activity.data = {
                    ...presence,
                    name: client.name
                }
                csInterface.dispatchEvent(activity)
            }

        } else {
            status = false;
        }
    } catch (err) {
        console.error(err);
    }
    setTimeout(main, interval);

    function callScript(func) {
        if (configurations["rpc"][func.replace('()', '')]["enabled"]) {
            csInterface.evalScript(func, (e) => {
                props[func.replace('()', '')] = e
            })
        } else {
            props[func.replace('()', '')] = undefined
        }
    
    }
    function callScriptNumber(func) {
        if (configurations["rpc"][func.replace('()', '')]["enabled"]) {
            csInterface.evalScript(func, (e) => {
                props[func.replace('()', '')] = parseInt(e)
            })
        }else{
            props[func.replace('()', '')] = 0
        }
    }
}
