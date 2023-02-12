/*
 * File: Config.jsx
 * Project: discord-rpc
 * File Created: Tuesday, 7th February 2023 11:30:23 am
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 * 
 * Last Modified: Sunday, 12th February 2023 7:43:21 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */

import React from 'react';
import ConfigItem from '../components/ConfigItem'
import { rpcConfiguration, extensionConfiguration } from '../configuration';
export default function Config() {
    return (
        <div className='flex flex-col gap-2'>
            <ConfigItem title="Rich Presence Configuration" configuration={rpcConfiguration} />
            <ConfigItem title="Extension Configuration" configuration={extensionConfiguration} />

            <div className='flex flex-row gap-2 self-center'>
                <button className='bg-button p-2 text-xs text-white rounded-sm'>Save Configuration</button>
                <button className='bg-transparent border border-error p-2 text-xs text-white rounded-sm'>Reset Default</button>
            </div>
        </div>
    )
}