/*
 * File: controller.js
 * Project: discord-rpc
 * File Created: Saturday, 4th February 2023 9:16:06 am
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 * 
 * Last Modified: Sunday, 12th February 2023 4:41:29 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */


import { rpcConfiguration, extensionConfiguration, hasProp, getConfiguration, setConfiguration } from "./configuration";

const csInterface = new CSInterface(); 

class Controller {
    constructor() {
        this.init()
    }

    logz(log){
        console.log("Controller:: " + log)
    }

    init(){
        this.logz("Initializing localstorage")
        this.logz("Registering log event")
        csInterface.addEventListener('com.tee.panel.log', (e) => {
            this.logz(e.data)
        })
        
        if (!getConfiguration('rpc')){
            this.logz("Defining rpc configuration")
            setConfiguration('rpc', rpcConfiguration)
        }

        if(!hasProp(getConfiguration('rpc'), rpcConfiguration)){
            this.logz("Mismatched Rich Presence configuration, resetting!")
            setConfiguration('rpc', rpcConfiguration)
        }

        if (!getConfiguration('extension')){
            this.logz("Defining extension configuration")
            setConfiguration('extension', extensionConfiguration)
        }

        if(!hasProp(getConfiguration('extension'), extensionConfiguration)){
            this.logz("Mismatched Extension configuration, resetting!")
            setConfiguration('extension', extensionConfiguration)
        }
    }

}

const controller = new Controller()
export default Controller