"use client"

import { getLinks } from "@/src/lib/actions"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import AddLinkDialog from "./dialogs/AddLinkDialog"

export default function LinkList() {
	const [isDialogOpen, setIsDialogOpen] = useState(false)

	const {
		data: userLinks,
		isLoading,
		isError,
		error
	} = useQuery({
		queryKey: ["links"],
		queryFn: getLinks
	})

	if (isLoading) return <p>Loading...</p>

	if (isError) return <p>Error: {error.message}</p>

	return (
		<ul>
			{userLinks.map((link) => (
				<li key={link.id}>
					<a href={link.url} target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2">
						{link.title} - {link.clicks} clicks
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
