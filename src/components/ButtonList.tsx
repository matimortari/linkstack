"use client"

import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"

interface UserButton {
	id: number
	url: string
	platform: string
	icon: string
	clicks: number
}

export default function ButtonList() {
	const [userButtons, setUserButtons] = useState<UserButton[]>([])
	const [loading, setLoading] = useState(true)

	// Fetch user buttons
	useEffect(() => {
		const fetchButtons = async () => {
			const res = await fetch("/api/buttons") // Make sure you have this endpoint set up
			const data: UserButton[] = await res.json()
			setUserButtons(data)
			setLoading(false)
		}

		fetchButtons()
	}, [])

	if (loading) return <p>Loading...</p>

	return (
		<ul>
			{userButtons.map((button) => (
				<li key={button.id}>
					<a href={button.url} target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2">
						<Icon icon={button.icon} />- {button.clicks} clicks
					</a>
				</li>
			))}
		</ul>
	)
}
