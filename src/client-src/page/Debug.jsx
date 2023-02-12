/*
 * File: Debug.jsx
 * Project: discord-rpc
 * File Created: Tuesday, 7th February 2023 11:30:54 am
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 * 
 * Last Modified: Sunday, 12th February 2023 2:47:27 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */

import React, { useEffect, useState } from 'react';
import { Hook, Console, Unhook } from 'console-feed'

// needs to be changed in future versions
export default function Debug() {

    const [logs, setLogs] = useState([])
    useEffect(() => {
        const hookedConsole = Hook(
            window.console,
            (log) => setLogs((currLogs) => [...currLogs, log]),
            false
        )
        return () => Unhook(hookedConsole)
    }, [])

    return (
        <div className='container mx-auto'>
            <div className='w-full h-full overflow-hidden'>
                <Console logs={logs} variant="dark" />
            </div>
        </div>

    )
}