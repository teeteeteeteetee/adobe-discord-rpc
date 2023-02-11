import React, {useState, useEffect} from 'react';
import defaultAvatar from "../../assets/default.png";
import { dispatchEvent } from '..';
export default function Avatar({className}) {

    const [avatar, setAvatar] = useState(defaultAvatar);
    useEffect(() => {
        dispatchEvent("com.tee.rpc.update", {})
        window.parent.csInterface.addEventListener("com.tee.rpc.user", (e) => {
            setAvatar(`https://cdn.discordapp.com/avatars/${e.data.id}/${e.data.avatar}?size=2048`)
            console.log(`https://cdn.discordapp.com/avatars/${e.data.id}/${e.data.avatar}?size=2048`)
        })
    }, [])

    return <img className={`rounded-full ring-[5px] ring-black w-20 h-20 ${className}`} src={avatar} alt="avatar" />
}