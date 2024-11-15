import { getButtons } from "@/src/lib/actions"
import { Icon } from "@iconify/react"
import { useQuery } from "@tanstack/react-query"
import Link from "next/link"
import { useState } from "react"
import AddButtonDialog from "../dialogs/AddButtonDialog"

export default function ButtonList() {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const { data: userButtons, isLoading } = useQuery({ queryKey: ["buttons"], queryFn: getButtons })

	if (isLoading) return <p className="py-2 text-sm text-muted-foreground">Loading Social Buttons...</p>

	return (
		<>
			<ul className="flex flex-row gap-2 py-2">
				{userButtons.map((button) => (
					<li key={button.id} className="content-container relative">
						<Link href={button.url} target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2">
							{button.icon && <Icon icon={button.icon} className="icon h-8 w-8" />}
						</Link>
						<button className="absolute bottom-0 right-0 p-1 text-destructive">
							<Icon icon="material-symbols:delete-outline" className="icon h-4 w-4" />
						</button>
					</li>
				))}
			</ul>

			{isDialogOpen && <AddButtonDialog onClose={() => setIsDialogOpen(false)} />}

			<div>
				<button onClick={() => setIsDialogOpen(true)} className="btn">
					Add Social Button
				</button>
			</div>
		</>
	)
}
