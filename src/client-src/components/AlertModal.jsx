import React, {useState, useEffect} from 'react';
import defaultAvatar from "../../assets/default.png";
import { dispatchEvent } from '..';
export default function AlertModal({className}) {

    return (
        <div className={`${className} absolute w-full h-full`}>
            <div className='bg-black opacity-30'/>
        </div>
    )
}