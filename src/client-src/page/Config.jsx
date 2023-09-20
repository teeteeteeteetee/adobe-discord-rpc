/*
 * File: Config.jsx
 * Project: discord-rpc
 * File Created: Tuesday, 7th February 2023 11:30:23 am
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 * 
 * Last Modified: Wednesday, 20th September 2023 2:58:43 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */

import React, {useEffect, useState} from 'react';
import ConfigItem from '../components/ConfigItem'
import { dispatchEvent } from '..';
import { extensionConfigurationTemplate, getConfigurations, resetConfiguration, rpcConfigurationTemplate } from "../../rpc_client-src/localstorage"
function ResetConfig(){
    dispatchEvent("com.tee.rpc.reset", {})
    // resetConfiguration()
}
function SaveConfig(config){
    console.log(config)
}
export default function Config() {

    const [config, setConfig] = useState({})

    useEffect(() => {
        setConfig(getConfigurations())
    }, [])

    return (
        <div className='w-screen'>
            <div className='flex flex-col'>
                <ConfigItem group="rpc" config={config} setConfig={setConfig} title="Rich Presence Configuration" template={rpcConfigurationTemplate} />
                <ConfigItem group="extension" config={config} setConfig={setConfig} title="Extension Configuration" template={extensionConfigurationTemplate} />

                <div className='flex flex-row gap-2 self-center'>
                    <button onClick={() => SaveConfig(config)} className='bg-button p-2 text-xs text-white rounded-sm'>Save Configuration</button>
                    <button onClick={() => ResetConfig()} className='bg-transparent border border-error p-2 text-xs text-white rounded-sm'>Reset Default</button>
                </div>
            </div>
        </div>

    )
}