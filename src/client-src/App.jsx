import React, { useState, useEffect } from 'react';
import Navigator from './components/Navigator';
import Visualizer from './page/Visualizer';
import Config from './page/Config';
import Debug from './page/Debug';
export default function App(props) {

    const [state, setState] = useState("");

    useEffect(() => setState("Visualizer"))

    return (
        <div className='h-screen w-full'>
            <Navigator setState={setState} />
            {state === "Visualizer" && <Visualizer />}
            {state === "Config" && <Config />}
            {state === "Debug" && <Debug />}
        </div>
    )
}