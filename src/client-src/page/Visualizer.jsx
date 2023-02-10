import React from "react";
import Avatar from "../components/Avatar";
import Banner from "../components/Banner";

export default function Visualizer() {
    return (
        <div className="w-screen rounded overflow-hidden h-96 pt-4">
            <div className="flex justify-center">
                <div className="flex flex-col self-center bg-black rounded-sm">
                    <div className="flex flex-col -space-y-12">
                        <Banner className={"self-start"} />
                        <div className="pl-3">
                            <Avatar />
                        </div>
                    </div>
                    <div className="w-full pt-7 px-5">
                        <div className="flex flex-col divide-y divide-tertiary gap-1 bg-black">
                            <h4 className="text-white text-azeri_black">Tee#0001</h4>
                            <h4 className="text-white text-azeri_black">PLAYING A GAME</h4>
                        </div>
                        <div className="flex gap-2 pt-2 pb-5">
                            <img className="rounded-sm w-[60px] h-[60px]" src="https://cdn.discordapp.com/app-assets/748586506888806460/752217634673655828.png"/>
                            <div className="flex flex-col text-white text-xs font-azeri_regular">
                                <p className="font-azeri_bold">Photoshop</p>
                                <p>Untitled-1</p>
                                <p>Background</p>
                                <p>04:02:20 elapsed</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
