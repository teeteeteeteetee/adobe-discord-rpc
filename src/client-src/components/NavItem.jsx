import React from "react"
export default function NavItem({ href, icon, text, onClick }) {
    return (
        <a href={href} onClick={onClick} className="grow mt-0 inline-block">
            <div className="flex-col text-center">
                <div className="h-auto w-auto self-center">
                    {icon}
                </div>
                <p className="text-gray-200 ml-2 mr-2">{text}</p>
            </div>
        </a>
    )
}