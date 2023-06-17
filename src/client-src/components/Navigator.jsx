/*
 * File: Navigator.jsx
 * Project: discord-rpc
 * File Created: Monday, 6th February 2023 9:35:09 pm
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 * 
 * Last Modified: Wednesday, 10th May 2023 1:19:59 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */
import React from "react";
import NavItem from "./NavItem";
import { FaDiscord, FaCog, FaGithub } from 'react-icons/fa'
import { VscDebugConsole } from 'react-icons/vsc'
import { openUrlInDefaultBrowser } from "..";
export default function Navigator({setState}) {

    return (
        <nav className="flex items-center justify-between flex-wrap bg-secondary p-6">
            <div className="w-full flex items-center divide-x hover:bg-blend-lighten">
                <NavItem onClick={() => setState("Preview")} href={"#"} text={"Preview"} icon={<FaDiscord className="text-gray-200 m-auto" />} />
                <NavItem onClick={() => setState("Config")} href={"#"} text={"Config"} icon={<FaCog className="text-gray-200 m-auto" />} />
                <NavItem onClick={() => setState("Debug")} href={"#"} text={"Debug"} icon={<VscDebugConsole className="text-gray-200 m-auto" />} />
                <NavItem onClick={() => openUrlInDefaultBrowser('https://github.com/teeteeteeteetee/adobe-discord-rpc')} href={"#"} text={"Repository"} icon={<FaGithub className="text-gray-200 m-auto" />} />
            </div>
        </nav>
    );
}
