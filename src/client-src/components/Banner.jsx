import React, {useEffect, useState} from "react";

// 340x60 no banner
// 340x120 premium banner
export default function Banner({className}) {

    const [banner, setBanner] = useState(undefined)

    useEffect(() => setBanner("https://cdn.discordapp.com/banners/223882126020444160/25c269b9ab52e512912a3b54ad5a21eb.png?size=480"))

    if(!banner){
        return <div className={`w-[320px] h-[60px] bg-black ${className}`}/>
    }

    return <img className={`w-[320px] h-[120px] border-4 border-black ${className}`} src={banner} alt="banner" />

}