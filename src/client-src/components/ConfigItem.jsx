/*
 * File: ConfigItem.jsx
 * Project: discord-rpc
 * File Created: Sunday, 12th February 2023 2:50:08 pm
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 *
 * Last Modified: Thursday, 11th May 2023 1:36:19 pm
 * Modified By: Tee (tee@stainless.love)
 *
 * Copyright (c) 2023 Tee, Stainless Love
 */
import React from "react";
import "../discord.css";

export default function ConfigItem({ title, configuration }) {
    const checkbox = (
        <div className="checkbox-container">
            <input className="checkbox" type="checkbox" />
            <div className="checkbox-visual outline-none border-none focus:ring-0">
                <div></div>
            </div>
        </div>
    );

    const dropdown = (
        <div>
        </div>
    )

    const list = Object.keys(configuration).map((key) => {
        if (typeof configuration[key] !== "string") {
            return (
                <li>
                    <div className="flex flex-row text-white">
                        <p>{configuration[key].name}</p>
                        <div className="grow" />

                        {configuration[key].type === "dropdown" && dropdown}
                        {configuration[key].type === "checkbox" && checkbox}
                    </div>
                </li>
            );
        }
    });

    return (
        <div className="pl-2">
            <p className="text-lg text-white">{title}</p>
            <ul className="text-white p-2">{list}</ul>
        </div>
    );
}
