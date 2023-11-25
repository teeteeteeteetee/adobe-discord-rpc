/*
 * File: controller.js
 * Project: discord-rpc
 * File Created: Saturday, 4th February 2023 9:16:06 am
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/teeteeteeteetee
 * Discord: Tee#0001
 * 
 * Last Modified: Saturday, 25th November 2023 6:12:27 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */

import { setConfiguration, rpcConfigurationTemplate, extensionConfigurationTemplate } from "../rpc_client-src/localstorage";

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

        if(Object.keys(window.localStorage).length <= 0){
            this.logz("Couldn't receive config, generating new ones.")
            setConfiguration("rpc", rpcConfigurationTemplate);
            setConfiguration("extension", extensionConfigurationTemplate);
        }
    }

}

new Controller()
export default Controller