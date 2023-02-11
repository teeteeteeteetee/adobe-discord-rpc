import React, {useEffect, useState} from "react";

// 340x60 no banner
// 340x120 premium banner
export default function Banner({className}) {

    const [banner, setBanner] = useState(undefined)

    // rpc api doesnt support banners yet
    // useEffect(() => setBanner("https://cdn.discordapp.com/banners/223882126020444160/.png?size=480"))

    if(!banner){
        return <div className={`w-[320px] h-[60px] bg-blurple ${className}`}/>
    }

    return <img className={`w-[320px] h-[120px] border-4 border-black ${className}`} src={banner} alt="banner" />

}