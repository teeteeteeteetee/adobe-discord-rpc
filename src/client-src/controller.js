/*
 * File: controller.js
 * Project: discord-rpc
 * File Created: Saturday, 4th February 2023 9:16:06 am
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 * 
 * Last Modified: Monday, 18th September 2023 11:35:31 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */

import { setConfiguration } from "../rpc_client-src/localstorage";


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
        csInterface.addEventListener('com.tee.panel.logger', (e) => {
            this.logz(e.data)
        })
        
        this.logz("Registering localstorage")
        csInterface.addEventListener('com.tee.rpc.config', (e) => {
            console.log(e.data)
            Object.keys(e.data).forEach(k => {
                setConfiguration(k, e.data[k])
            })
            this.logz(e.data)
        })
    }

}

new Controller()
export default Controller