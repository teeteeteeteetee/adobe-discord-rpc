/*
 * File: localstorage.js
 * Project: discord-rpc-client
 * File Created: Sunday, 12th February 2023 9:36:50 pm
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/teeteeteeteetee
 * Discord: Tee#0001
 * 
 * Last Modified: Sunday, 7th April 2024 11:52:17 am
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */

const csInterface = new CSInterface();

export const rpcConfigurationTemplate = {
    enabled: {
        enabled: true,
        description: "",
        name: "Rich Presence Enable",
        type: "checkbox",
        hidden: false
    },
    details: {
        enabled: true,
        description: "",
        name: "Details",
        type: "checkbox",
        hidden: false
    },
    state: {
        enabled: true,
        description: "",
        name: "State",
        type: "checkbox",
        hidden: false
    },
    timestamp: {
        enabled: true,
        description: "",
        name: "Timestamp",
        type: "checkbox",
        hidden: false
    },
    largeImageKey: {
        enabled: true,
        value: "logo2",
        description: "",
        name: "Large Icon",
        type: "dropdown",
        hidden: false
    },
    largeImageText: {
        enabled: true,
        description: "",
        name: "Large Icon Text",
        type: "checkbox",
        hidden: false
    },
    smallImageKey: {
        enabled: true,
        description: "",
        name: "Small Icon",
        type: "checkbox",
        hidden: false
    },
    smallImageText: {
        enabled: true,
        description: "",
        name: "Small Icon Text",
        type: "checkbox",
        hidden: false
    },
    partySize: {
        enabled: true,
        description: "",
        name: "Party Size",
        type: "checkbox",
        hidden: true
    },
    partyMax: {
        enabled: true,
        description: "",
        name: "Party Max",
        type: "checkbox",
        hidden: true
    }
}

export const extensionConfigurationTemplate = {
    updateNotification: {
        enabled: true,
        description: "",
        name: "Update Notification",
        type: "checkbox",
        hidden: false
    },
    catMode: {
        enabled: false,
        description: "",
        name: "Cat",
        type: "checkbox",
        hidden: false
    },
}

export function setConfiguration(name, configuration){
    window.localStorage.setItem(name, JSON.stringify(configuration));
    csInterface.dispatchEvent('com.tee.panel.settings')
}

export function getConfiguration(name){
    return JSON.parse(window.localStorage.getItem(name))
}

export function getConfigurations(){
    const conf = {}
    Object.keys(window.localStorage).forEach(key => {
        conf[key] = getConfiguration(key)
    })
    
    return conf
}

export function compare(obj, prop) {
    return JSON.stringify(obj) === JSON.stringify(prop) ?  true : false;
};

export function resetConfiguration(){
    window.localStorage.clear()
    location.reload()
}