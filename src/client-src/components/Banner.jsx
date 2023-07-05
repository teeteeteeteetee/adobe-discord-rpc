/*
 * File: Banner.jsx
 * Project: discord-rpc
 * File Created: Sunday, 2nd July 2023 1:46:25 pm
 * Author: Tee (tee@stainless.love)
 * Github: https://github.com/teeteeteeteetee
 * Discord: Tee#0001
 * 
 * Last Modified: Wednesday, 5th July 2023 9:52:55 am
 * Modified By: Tee (tee@stainless.love)
 * 
 * Copyright (c) 2023 Tee, Stainless Love
 */
import React, {useEffect, useState} from "react";
import { dispatchEvent } from '..';

// 340x60 no banner
// 340x120 premium banner
export default function Banner({className}) {

    const [banner, setBanner] = useState(undefined)

    // rpc api doesnt support banners yet
    // useEffect(() => {
    //     dispatchEvent("com.tee.rpc.update", {})
    //     window.parent.csInterface.addEventListener("com.tee.rpc.user", (e) => {
    //         console.log(e.data)
    //         console.log(e.data.banner)
    //     })
    //     // setBanner("https://cdn.discordapp.com/banners/223882126020444160/.png?size=480")
    // }, [])

    if(!banner){
        return <div className={`w-[320px] h-[60px] bg-blurple ${className}`}/>
    }

    return <img className={`w-[320px] h-[120px] border-4 border-black ${className}`} src={banner} alt="banner" />

}