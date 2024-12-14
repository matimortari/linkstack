"use client"

import { useDeleteButton } from "@/src/hooks/useMutations"
import { getButtons } from "@/src/lib/actions"
import { Icon } from "@iconify/react"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"
import AddButtonDialog from "../dialogs/AddButtonDialog"

export default function ButtonList({ buttons, setButtons }) {
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)

	const { isPending } = useQuery({ queryKey: ["buttons"], queryFn: getButtons })
	const { mutate: deleteButtonMutation } = useDeleteButton()

	if (isPending) return <p className="description-label text-muted-foreground">Loading social buttons...</p>

	const handleDeleteButton = (id) => {
		deleteButtonMutation(id, {
			onSuccess: () => {
				setButtons((prevButtons) => prevButtons.filter((button) => button.id !== id))
			}
		})
	}

	const handleAddButton = (newButton) => {
		setButtons((prevButtons) => [...prevButtons, newButton])
	}

	return (
		<>
			<ul className="my-2 flex flex-row gap-2">
				{buttons.map((button) => (
					<li key={button.id} className="content-container relative">
						<Link href={button.url} target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2">
							{button.icon && <Icon icon={button.icon} className="icon h-8 w-8" />}
						</Link>
						<button
							onClick={() => handleDeleteButton(button.id)}
							className="absolute bottom-0 right-0 p-1 text-destructive"
						>
							<Icon icon="material-symbols:delete-outline" className="icon h-4 w-4" />
						</button>
					</li>
				))}
			</ul>

			{isAddDialogOpen && <AddButtonDialog onClose={() => setIsAddDialogOpen(false)} addButton={handleAddButton} />}

			<div>
				<button onClick={() => setIsAddDialogOpen(true)} className="btn">
					Add Social Button
				</button>
			</div>
		</>
	)
}
