/*
 * File: ConfigItem.jsx
 * Project: discord-rpc
 * File Created: Sunday, 12th February 2023 2:50:08 pm
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 *
 * Last Modified: Tuesday, 19th September 2023 10:25:12 am
 * Modified By: Tee (tee@stainless.love)
 *
 * Copyright (c) 2023 Tee, Stainless Love
 */
import React, { useEffect, useState } from "react";
import "../discord.css";

export default function ConfigItem({ title, template, group, config, setConfig }) {

    const checkbox = (id) => {
        if(Object.keys(config).length !== 0){
            const [checked, setChecked] = useState(config[group][id].enabled)

            return (
                <div className="checkbox-container my-auto">
                    <input checked={checked} onChange={() => {
                        setChecked(!checked)
                        config[group][id].enabled = !checked
                        setConfig(config)
                    }} className="checkbox" id={id} type="checkbox" />
                    <div className="checkbox-visual outline-none border-none focus:ring-0">
                        <div></div>
                    </div>
                </div>
            );
        }
    }


    const dropdown = (id) => (
        <div>
            <select id={id} className="bg-dropdown outline-none w-32 px-2 rounded-md" name="logo">
                <option value="old">Old</option>
                <option value="new">Updated</option>
                <option value="custom">Custom</option>
            </select>
        </div>
    )

    const list = Object.keys(template)
        .filter(key => !template[key].hidden)
        .map((key) => {
            if (typeof template[key] !== "string") {
                return (
                    <li key={key}>
                        <div className="flex flex-row text-white">
                            <label className="select-none" htmlFor={key}>{template[key].name}</label>
                            <div className="grow pr-2" />

                            {template[key].type === "dropdown" && dropdown(key)}
                            {template[key].type === "checkbox" && checkbox(key)}
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
