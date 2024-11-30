"use client"

import { Icon } from "@iconify/react"
import { useState } from "react"
import { trackClick } from "../lib/analytics"

export default function UserButton({ url, icon, settings, buttonId, userId }) {
	const [isHovered, setIsHovered] = useState(false)

	const handleClick = async () => {
		await trackClick(buttonId, "button", userId)
	}

	return (
		<li className="flex flex-row items-center justify-center">
			<a href={url} target="_blank" rel="noopener noreferrer" onClick={handleClick}>
				<div
					className="flex h-10 w-10 items-center justify-center rounded-full"
					style={{
						backgroundColor: isHovered ? settings.buttonHoverBackgroundColor : settings.buttonBackgroundColor,
						boxShadow: settings.isButtonShadow ? `0 4px 6px ${settings.buttonShadowColor}` : "none",
						transition: "background-color 0.3s ease, box-shadow 0.3s ease"
					}}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				>
					{icon && <Icon icon={icon} className="h-5 w-5" style={{ color: settings.buttonIconColor }} />}
				</div>
			</a>
		</li>
	)
}
