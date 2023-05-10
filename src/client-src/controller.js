/*
 * File: controller.js
 * Project: discord-rpc
 * File Created: Saturday, 4th February 2023 9:16:06 am
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 * 
 * Last Modified: Monday, 8th May 2023 11:23:00 am
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */


// import { rpcConfiguration, extensionConfiguration, hasProp, getConfiguration, setConfiguration } from "./configuration";

const csInterface = new CSInterface(); 

class Controller {
    constructor() {
        this.init()
    }

    logz(log){
        console.log("Controller:: " + log)
    }

    init(){
        this.logz("Registering log event")
        csInterface.addEventListener('com.tee.panel.log', (e) => {
            this.logz(e.data)
        })
        
        this.logz("Registering localstorage")
        csInterface.addEventListener('com.tee.panel.localstorage', (e) => {
            window.localStorage.setItem(e.data.name, e.data.value)
        })
    }

}

const controller = new Controller()
export default Controller