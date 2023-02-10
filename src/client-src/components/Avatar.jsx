import React, {useState, useEffect} from 'react';
import defaultAvatar from "../../assets/default.png";
export default function Avatar({className}) {

    const [avatar, setAvatar] = useState("");

    useEffect(() => setAvatar("https://cdn.discordapp.com/avatars/223882126020444160/ead18c39086cb8d2fed1ea3d2d3b264b.webp?size=80"));
    // useEffect(() => setAvatar(defaultAvatar));));

    return <img className={`rounded-full ring-[5px] ring-black w-20 h-20 ${className}`} src={avatar} alt="avatar" />
}