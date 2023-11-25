/*
 * File: NavItem.jsx
 * Project: discord-rpc
 * File Created: Sunday, 2nd July 2023 1:46:25 pm
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/teeteeteeteetee
 * Discord: Tee#0001
 *
 * Last Modified: Saturday, 25th November 2023 2:43:30 pm
 * Modified By: Tee (tee@stainless.love)
 *
 * Copyright (c) 2023 Tee, Demon Cat
 */
import React from "react";
export default function NavItem({ href, icon, text, onClick, update = false }) {
    return (
        <a
            href={href}
            onClick={onClick}
            className="grow mt-0 inline-block hover:brightness-75 hover:shadow-lg focus:brightness-75 focus:shadow-lg focus:outline-none focus:ring-0 active:brightness-50 active:shadow-lg transition duration-150 ease-in-out"
        >

            <div className="flex-col text-center">
                <div className="h-auto w-auto self-center">
                    {update && (
                        <span className="relative flex h-3 w-3 float-right">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                        </span>
                    )}

                    {icon}
                </div>
                <p className="text-gray-200 ml-2 mr-2">{text}</p>
            </div>
        </a>
    );
}
