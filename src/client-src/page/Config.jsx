/*
 * File: Config.jsx
 * Project: discord-rpc
 * File Created: Tuesday, 7th February 2023 11:30:23 am
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 * 
 * Last Modified: Monday, 18th September 2023 8:58:15 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */

import React, {useEffect, useState} from 'react';
import ConfigItem from '../components/ConfigItem'
import { dispatchEvent } from '..';
import { extensionConfigurationTemplate, rpcConfigurationTemplate } from "../../rpc_client-src/localstorage"
export default function Config() {

    const [config, setConfig] = useState({})

    useEffect(() => {

        dispatchEvent("com.tee.rpc.update", {})
        console.log("config2")
        window.parent.csInterface.addEventListener("com.tee.rpc.config", (e) => {
            setConfig(e.data)
            console.log("config")
            console.log(e.data)
        })

    }, [])

    return (
        <div className='w-screen'>
            <div className='flex flex-col'>
                <ConfigItem title="Rich Presence Configuration" configuration={rpcConfigurationTemplate} />
                <ConfigItem title="Extension Configuration" configuration={extensionConfigurationTemplate} />

                <div className='flex flex-row gap-2 self-center'>
                    <button className='bg-button p-2 text-xs text-white rounded-sm'>Save Configuration</button>
                    <button className='bg-transparent border border-error p-2 text-xs text-white rounded-sm'>Reset Default</button>
                </div>
            </div>
        </div>

    )
}