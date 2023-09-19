/*
 * File: index.js
 * Project: discord-rpc
 * File Created: Saturday, 4th February 2023 9:16:06 am
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 * 
 * Last Modified: Monday, 18th September 2023 11:36:54 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */



import React from 'react'
import { createRoot } from 'react-dom/client';
import controller from './controller.js';
import App from './App.jsx'
import './index.css';

const csInterface = new CSInterface(); 

// window.parent.csInterface;
window.csInterface = csInterface;

createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App controller={controller} />
    </React.StrictMode>
)

export function dispatchEvent(name, data) {
    const event = new CSEvent(name, "APPLICATION")
    event.data = data;
    csInterface.dispatchEvent(event)
    console.log(`dispatched:: ${JSON.stringify(event)}`)
}

export function getApplicationID() {
    return csInterface.getApplicationID()
}

export function openURLInDefaultBrowser(url){
    return csInterface.openURLInDefaultBrowser(url)
}