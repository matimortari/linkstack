import { getLinks } from "@/src/lib/actions"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import AddLinkDialog from "../dialogs/AddLinkDialog"

export default function LinkList() {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const { data: userLinks, isLoading } = useQuery({ queryKey: ["links"], queryFn: getLinks })

	if (isLoading) return <p className="py-2 text-sm text-muted-foreground">Loading Links...</p>

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
