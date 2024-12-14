import { useDeleteLink, useUpdateLink } from "@/src/hooks/useMutations"
import { getLinks } from "@/src/lib/actions"
import { Icon } from "@iconify/react"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import AddLinkDialog from "../dialogs/AddLinkDialog"
import UpdateLinkDialog from "../dialogs/UpdateLinkDialog"

export default function LinkList({ links, setLinks }) {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
	const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
	const [currentLink, setCurrentLink] = useState(null)

	const { isPending } = useQuery({ queryKey: ["links"], queryFn: getLinks })
	const { mutate: deleteLinkMutation } = useDeleteLink()
	const { mutate: updateLinkMutation } = useUpdateLink({ onClose: () => setIsUpdateDialogOpen(false) })

	if (isPending) return <p className="description-label text-muted-foreground">Loading links...</p>

	const handleDeleteLink = (id) => {
		deleteLinkMutation(id, {
			onSuccess: () => {
				setLinks((prevLinks) => prevLinks.filter((link) => link.id !== id))
			}
		})
	}

	const handleAddLink = (newLink) => {
		setLinks((prevLinks) => [...prevLinks, newLink])
	}

	const handleUpdateLink = (updatedLink) => {
		setLinks((prevLinks) => prevLinks.map((link) => (link.id === updatedLink.id ? updatedLink : link)))
	}

	return (
		<>
			<ul className="my-2 grid grid-cols-1 gap-2 md:grid-cols-2">
				{links.map((link) => (
					<li key={link.id} className="content-container flex flex-row gap-1">
						<div className="flex flex-col">
							<div className="flex flex-row gap-1">
								<a href={link.url} target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2">
									{link.title}
								</a>

								<button
									onClick={() => {
										setCurrentLink(link)
										setIsUpdateDialogOpen(true)
									}}
								>
									<Icon icon="material-symbols:edit-square-outline" className="icon h-4 w-4 text-muted-foreground" />
								</button>
								<button onClick={() => handleDeleteLink(link.id)}>
									<Icon icon="material-symbols:delete-outline" className="icon h-4 w-4 text-destructive" />
								</button>
							</div>
							<span className="text-xs text-muted-foreground">{link.url}</span>
						</div>
					</li>
				))}
			</ul>

			{isAddDialogOpen && <AddLinkDialog onClose={() => setIsAddDialogOpen(false)} addLink={handleAddLink} />}
			{isUpdateDialogOpen && currentLink && (
				<UpdateLinkDialog
					onClose={() => setIsUpdateDialogOpen(false)}
					linkData={currentLink}
					updateLink={handleUpdateLink}
				/>
			)}

			<div>
				<button onClick={() => setIsAddDialogOpen(true)} className="btn">
					Add Link
				</button>
			</div>
		</>
	)
}
