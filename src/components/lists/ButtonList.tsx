import { getButtons } from "@/src/lib/actions"
import { Icon } from "@iconify/react"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import AddButtonDialog from "../dialogs/AddButtonDialog"

export default function ButtonList() {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const { data: userButtons, isLoading } = useQuery({ queryKey: ["buttons"], queryFn: getButtons })

	if (isLoading) return <p className="py-2 text-sm text-muted-foreground">Loading Social Buttons...</p>

	return (
		<ul>
			{userButtons.map((button) => (
				<li key={button.id}>
					<a href={button.url} target="_blank" rel="noopener noreferrer" className="flex flex-row gap-2">
						<Icon icon={button.icon} />- {button.clicks} clicks
					</a>
				</li>
			))}

			{isDialogOpen && <AddButtonDialog onClose={() => setIsDialogOpen(false)} />}

			<button onClick={() => setIsDialogOpen(true)} className="btn">
				Add Button
			</button>
		</ul>
	)
}
