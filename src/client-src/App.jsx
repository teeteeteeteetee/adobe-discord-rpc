
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