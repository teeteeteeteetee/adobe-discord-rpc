/*
 * File: controller.js
 * Project: discord-rpc
 * File Created: Saturday, 4th February 2023 9:16:06 am
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 * 
 * Last Modified: Sunday, 12th February 2023 2:22:27 pm
 * Modified By: Tee Tee
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */


import { configuration, hasProp, getConfiguration, setConfiguration } from "./configuration";


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
        window.parent.csInterface.addEventListener('com.tee.panel.log', (e) => {
            this.logz(e.data)
        })
        if (!getConfiguration){
            this.logz("Defining configuration")
            setConfiguration(configuration)
        }

        let conf = getConfiguration
        if(!hasProp(conf, prop)){
            this.logz("Mismatched configuration, resetting!")
            setConfiguration(configuration)
        }
    }

}

const controller = new Controller()
export default Controller