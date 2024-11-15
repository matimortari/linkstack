import { getLinks } from "@/src/lib/actions"
import { Icon } from "@iconify/react"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import AddLinkDialog from "../dialogs/AddLinkDialog"

export default function LinkList() {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const [currentLink, setCurrentLink] = useState(null)
	const { data: userLinks, isLoading } = useQuery({ queryKey: ["links"], queryFn: getLinks })

	const handleEditLink = (link) => {
		setCurrentLink(link)
		setIsDialogOpen(true)
	}
	if (isLoading) return <p className="py-2 text-sm text-muted-foreground">Loading Links...</p>

	return (
		<>
			<ul className="grid grid-cols-1 gap-2 py-2 md:grid-cols-2">
				{userLinks.map((link) => (
					<li key={link.id} className="content-container flex flex-row gap-1">
						<div className="flex flex-col">
							<div className="flex flex-row gap-1">
								<a href={link.url} target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2">
									{link.title} - {link.clicks} clicks
								</a>
								<button onClick={() => handleEditLink(link)}>
									<Icon icon="material-symbols:edit-square-outline" className="icon h-4 w-4 text-muted-foreground" />
								</button>
								<button
									onClick={() => {
										undefined
									}}
								>
									<Icon icon="material-symbols:delete-outline" className="icon h-4 w-4 text-destructive" />
								</button>
							</div>
							<span className="text-xs text-muted-foreground">{link.url}</span>
						</div>
					</li>
				))}
			</ul>

			{isDialogOpen && <AddLinkDialog onClose={() => setIsDialogOpen(false)} />}

			{/* {isDialogOpen && currentLink && (
				<UpdateLinkDialog onClose={() => setIsDialogOpen(false)} linkData={currentLink} />
			)} */}

			<div>
				<button onClick={() => setIsDialogOpen(true)} className="btn">
					Add Link
				</button>
			</div>
		</>
	)
}
