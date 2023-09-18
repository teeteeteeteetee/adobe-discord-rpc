/*
 * File: localstorage.js
 * Project: discord-rpc-client
 * File Created: Sunday, 12th February 2023 9:36:50 pm
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 * 
 * Last Modified: Monday, 18th September 2023 9:03:14 pm
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
        type: "checkbox"
    },
    details: {
        enabled: true,
        description: "",
        name: "Details",
        type: "checkbox"
    },
    state: {
        enabled: true,
        description: "",
        name: "State",
        type: "checkbox"
    },
    timestamp: {
        enabled: true,
        description: "",
        name: "Timestamp",
        type: "checkbox"
    },
    largeImageKey: {
        enabled: true,
        description: "",
        name: "Large Icon",
        type: "dropbox"
    },
    largeImageText: {
        enabled: true,
        description: "",
        name: "Large Icon Text",
        type: "checkbox"
    },
    smallImageKey: {
        enabled: true,
        description: "",
        name: "Small Icon",
        type: "checkbox"
    },
    smallImageText: {
        enabled: true,
        description: "",
        name: "Small Icon Text",
        type: "checkbox"
    },
}

export const extensionConfigurationTemplate = {
    updateNotification: {
        enabled: true,
        description: "",
        name: "Update Notification",
        type: "checkbox"
    },
    catMode: {
        enabled: false,
        description: "",
        name: "Cat Mode",
        type: "checkbox"
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

export function hasProp(obj, prop) {
    return Object.keys(obj) === Object.keys(prop) ?  true : false;
};
