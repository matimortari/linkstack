import { deleteLink, getLinks } from "@/src/lib/actions"
import { Icon } from "@iconify/react"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import AddLinkDialog from "../dialogs/AddLinkDialog"
import UpdateLinkDialog from "../dialogs/UpdateLinkDialog"

export default function LinkList() {
	const [isAddLinkDialogOpen, setIsAddLinkDialogOpen] = useState(false) // State for Add Link Dialog
	const [isUpdateLinkDialogOpen, setIsUpdateLinkDialogOpen] = useState(false) // State for Update Link Dialog
	const [currentLink, setCurrentLink] = useState(null) // Current link for editing
	const { data: userLinks, isLoading } = useQuery({ queryKey: ["links"], queryFn: getLinks })

	const handleAddLink = () => {
		setIsAddLinkDialogOpen(true)
	}

	const handleEditLink = (link) => {
		setCurrentLink(link)
		setIsUpdateLinkDialogOpen(true)
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
								<button onClick={() => deleteLink(link.id)}>
									<Icon icon="material-symbols:delete-outline" className="icon h-4 w-4 text-destructive" />
								</button>
							</div>
							<span className="text-xs text-muted-foreground">{link.url}</span>
						</div>
					</li>
				))}
			</ul>

			{isAddLinkDialogOpen && <AddLinkDialog onClose={() => setIsAddLinkDialogOpen(false)} />}

			{isUpdateLinkDialogOpen && currentLink && (
				<UpdateLinkDialog onClose={() => setIsUpdateLinkDialogOpen(false)} linkData={currentLink} />
			)}

			<div>
				<button onClick={handleAddLink} className="btn">
					Add Link
				</button>
			</div>
		</>
	)
}
