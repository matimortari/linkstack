"use client"

import { useEffect, useState } from "react"
import AddLinkDialog from "./dialogs/AddLinkDialog"

export default function LinkList() {
	const [userLinks, setUserLinks] = useState<UserLink[]>([])
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [loading, setLoading] = useState(true)

	// Fetch user links
	useEffect(() => {
		const fetchLinks = async () => {
			const res = await fetch("/api/links")
			const data: UserLink[] = await res.json()
			setUserLinks(data)
			setLoading(false)
		}

		fetchLinks()
	}, [])

	if (loading) return <p>Loading...</p>

	return (
		<ul>
			{userLinks.map((link) => (
				<li key={link.id}>
					<a href={link.url} target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2">
						{link.title}- {link.clicks} clicks
					</a>
				</li>
			))}

			{isDialogOpen && <AddLinkDialog onClose={() => setIsDialogOpen(false)} />}

			<button onClick={() => setIsDialogOpen(true)} className="btn">
				Add Link
			</button>
		</ul>
	)
}
