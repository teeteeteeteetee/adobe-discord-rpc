import React from "react";
import NavItem from "./NavItem";
import { FaDiscord, FaCog, FaGithub } from 'react-icons/fa'
import { VscDebugConsole } from 'react-icons/vsc'
export default function Navigator() {
    return (
        <nav className="flex items-center justify-between flex-wrap bg-secondary p-6">
            <div className="w-full flex items-center divide-x hover:bg-blend-lighten">
                <NavItem href={"#"} text={"Visualizer"} icon={<FaDiscord className="text-gray-200 m-auto" />} />
                <NavItem href={"#"} text={"Config"} icon={<FaCog className="text-gray-200 m-auto" />} />
                <NavItem href={"#"} text={"Debug"} icon={<VscDebugConsole className="text-gray-200 m-auto" />} />
                <NavItem href={"#"} text={"Repository"} icon={<FaGithub className="text-gray-200 m-auto" />} />
            </div>
        </nav>
    );
}
