import React from "react"
export default function NavItem({ href, icon, text, onClick, }) {
    return (
        <a href={href} onClick={onClick} className="grow mt-0 inline-block hover:brightness-75 hover:shadow-lg focus:brightness-75 focus:shadow-lg focus:outline-none focus:ring-0 active:brightness-50 active:shadow-lg transition duration-150 ease-in-out">
            <div className="flex-col text-center">
                <div className="h-auto w-auto self-center">
                    {icon}
                </div>
                <p className="text-gray-200 ml-2 mr-2">{text}</p>
            </div>
        </a>
    )
}