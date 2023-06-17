/*
 * File: Preview.jsx
 * Project: discord-rpc
 * File Created: Tuesday, 7th February 2023 11:30:36 am
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/lolitee
 * Discord: Tee#0001
 * 
 * Last Modified: Wednesday, 10th May 2023 12:58:02 pm
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */

import React, { useEffect, useState } from "react";
import Avatar from "../components/Avatar";
import Banner from "../components/Banner";
import { dispatchEvent } from "..";

export default function Preview() {

    const [activity, setActivity] = useState({})
    const [user, setUser] = useState({
        username: "User",
        discriminator: "0000",
    })
    useEffect(() => {
        dispatchEvent("com.tee.rpc.update", {})
        window.parent.csInterface.addEventListener("com.tee.rpc.activity", (e) => {
            setActivity(e.data)
            console.log(e.data)
        })
        window.parent.csInterface.addEventListener("com.tee.rpc.user", (e) => {
            setUser(e.data)
            console.log(e.data)
        })

    }, [])

    return (
        <div className="w-screen rounded-sm overflow-hidden h-96 pt-4">
            <div className="flex justify-center">
                <div className="flex flex-col self-center bg-black rounded-sm w-[320px]">
                    <div className="flex flex-col -space-y-12">
                        <Banner className={"self-start"} />
                        <div className="pl-3">
                            <Avatar />
                        </div>
                    </div>
                    <div className="w-full pt-7 px-5">
                        <div className="flex flex-col divide-y divide-tertiary gap-1 bg-black">
                            <p className="text-white font-medium">{user.username}{user.discriminator != 0 && <span className="text-gray-300">{`#${user.discriminator}`}</span>}</p>
                            <p className="text-white font-medium tracking-tighter">PLAYING A GAME</p>
                        </div>
                        <div className="flex gap-2 pt-2 pb-5">
                            <img className="rounded-sm w-[60px] h-[60px]" src="https://cdn.discordapp.com/app-assets/748586506888806460/752217634673655828.png" />
                            <div className="flex flex-col text-white text-xs font-azeri_regular justify-center">
                                {activity.name != "" && <p className="font-azeri_bold">{activity.name}</p>}
                                {activity.details != "" && <p>{activity.details}</p>}
                                {
                                    activity.state != "" && 
                                    <p>{activity.state} 
                                        {(activity.partySize != "" && activity.partyMax != "") && <span>{` (${activity.partySize} of ${activity.partyMax})`}</span>}
                                    </p>
                                }
                                <p>04:02:20 elapsed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
