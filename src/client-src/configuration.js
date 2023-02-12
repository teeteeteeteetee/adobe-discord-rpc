/*
 * File: configuration.js
 * Project: discord-rpc
 * File Created: Sunday, 12th February 2023 2:13:24 pm
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 * 
 * Last Modified: Sunday, 12th February 2023 2:37:29 pm
 * Modified By: Tee (tee@stainless.love>)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */

const name = 'configuration'

export const configuration = {
    enabled: true,
    details: true,
    state: true,
    timestamp: true,
    largeImage: 'logo',
    largeImageKey: true,
    largeImageText: true,
    customLargeImage: false,
    smallImageKey: true,
    smallImageText: true,
    updateNotification: true,
    catMode: false,
}

export function setConfiguration(configuration){
    window.localStorage.setItem(name, configuration);
}

export function getConfiguration(property){
    if(!property){
        return window.localStorage.getItem(name)
    }
    return window.localStorage.getItme(name)[property]
}

export function hasProp(obj, prop) {
    Object.keys(obj).forEach(function (key) {
        if (key === prop) {
            return [true, obj[key]];
        } else if (typeof obj[key] === 'object') {
            hasProp(obj[key], prop);
        } else {
            return false;
        }
    });
};