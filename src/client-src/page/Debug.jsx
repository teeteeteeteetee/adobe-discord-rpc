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