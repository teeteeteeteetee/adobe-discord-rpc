/*
 * File: App.jsx
 * Project: discord-rpc
 * File Created: Saturday, 4th February 2023 9:16:06 am
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 * 
 * Last Modified: Wednesday, 10th May 2023 1:03:58 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */

import React, { useState, useEffect } from 'react';
import Navigator from './components/Navigator';
import Preview from './page/Preview';
import Config from './page/Config';
import Debug from './page/Debug';
export default function App(props) {

    const [state, setState] = useState("");

    useEffect(() => setState("Preview"), [])

    return (
        <div className='h-screen w-full'>
            <Navigator setState={setState} />
            {state === "Preview" && <Preview />}
            {state === "Config" && <Config />}
            {state === "Debug" && <Debug />}
        </div>
    )
}