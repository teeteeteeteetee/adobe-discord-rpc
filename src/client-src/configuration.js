/*
 * File: configuration.js
 * Project: discord-rpc
 * File Created: Sunday, 12th February 2023 2:13:24 pm
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 * 
 * Last Modified: Sunday, 12th February 2023 7:12:57 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */

export const rpcConfiguration = {
    details: {
        enabled: true,
        description: "",
        name: "Details"
    },
    state: {
        enabled: true,
        description: "",
        name: "State"
    },
    timestamp: {
        enabled: true,
        description: "",
        name: "Timestamp"
    },
    largeImage: 'logo',
    largeImageKey: {
        enabled: true,
        description: "",
        name: "Large Icon"
    },
    largeImageText: {
        enabled: true,
        description: "",
        name: "Large Icon Text"
    },
    customLargeImage: {
        enabled: false,
        description: "",
        name: "Custom Icon"
    },
    smallImageKey: {
        enabled: true,
        description: "",
        name: "Small Icon"
    },
    smallImageText: {
        enabled: true,
        description: "",
        name: "Small Icon Text"
    },
}

export const extensionConfiguration = {
    enabled: {
        enabled: true,
        description: "",
        name: "Rich Presence Enable"
    },
    updateNotification: {
        enabled: true,
        description: "",
        name: "Update Notification"
    },
    catMode: {
        enabled: false,
        description: "",
        name: "Cat Mode"
    },
}

export function setConfiguration(name, configuration){
    window.localStorage.setItem(name, configuration);
}

export function getConfiguration(name, property){
    if(!property){
        return window.localStorage.getItem(name)
    }
    return window.localStorage.getItem(name)[property]
}

export function hasProp(obj, prop) {
    return Object.keys(obj) === Object.keys(prop) ?  true : false;
};