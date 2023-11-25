/*
 * File: Repository.jsx
 * Project: discord-rpc
 * File Created: Saturday, 25th November 2023 12:03:24 pm
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/teeteeteeteetee
 * Discord: Tee#0001
 * 
 * Last Modified: Saturday, 25th November 2023 4:20:27 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Demon Cat
 */
import React, { useEffect, useState } from 'react';
import property from "../../../package.json"
import { FaDiscord, FaGithub } from 'react-icons/fa'
import { openURLInDefaultBrowser } from '..';

// TODO: Click to update


export default function Repository() {

    const [update, setUpdate] = useState(false)
    const [latest, setLatest] = useState(property.version)

    useEffect(() => {
        fetch("https://api.github.com/repos/teeteeteeteetee/adobe-discord-rpc/releases/latest")
            .then(response => response.json())
            .then(latest => {
                if (latest["tag_name"] != property.version) {
                    setUpdate(true)
                    setLatest(latest["tag_name"])
                }
            })
    }, [])

    return (
        <div className='w-screen'>
            <div className='flex flex-col h-max'>
                <div className='flex items-center flex-col justify-center text-lg text-white gap-1 pt-4 mb-auto'>
                    <FaGithub className='cursor-pointer' size={64} onClick={() => openURLInDefaultBrowser("https://github.com/teeteeteeteetee/adobe-discord-rpc")} />
                    <FaDiscord className='cursor-pointer' size={64} onClick={() => openURLInDefaultBrowser("https://discord.com/invite/RGtxbuFtzb")} />
                    <br />
                    <p>Version: {property.version}</p>
                    <p>Latest version: {latest}</p>

                    {update && (
                        <a className='text-sm text-gray-400 cursor-pointer inline-flex items-center hover:underline' onClick={() => openURLInDefaultBrowser(`https://github.com/teeteeteeteetee/adobe-discord-rpc/releases/tag/${latest}`)}>
                            New version is ready!
                            <svg className="w-3 h-3 ms-2.5 rtl:rotate-[270deg]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d="M15 11v4.833A1.166 1.166 0 0 1 13.833 17H2.167A1.167 1.167 0 0 1 1 15.833V4.167A1.166 1.166 0 0 1 2.167 3h4.618m4.447-2H17v5.768M9.111 8.889l7.778-7.778" />
                            </svg>
                        </a>
                    )}
                </div>
                <footer>
                    <p className='text-xs text-gray-600 pl-2'>made by tee</p>
                </footer>
            </div>
        </div>
    )
}