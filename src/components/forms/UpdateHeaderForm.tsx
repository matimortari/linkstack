"use client"

import { useUpdateDescription } from "@/src/hooks/useMutations"
import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function UpdateHeaderForm() {
	const { data: session } = useSession()
	const [localDescription, setLocalDescription] = useState("")
	const [currentDescription, setCurrentDescription] = useState("")
	const { mutate, isPending, error, isSuccess } = useUpdateDescription()

	useEffect(() => {
		if (session) {
			setCurrentDescription(session.user.description || "Enter description")
		}
	}, [session])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		mutate(localDescription)
	}

	const handleReset = () => {
		setLocalDescription("")
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="form-container my-2 max-w-xl">
				<input
					type="text"
					value={localDescription}
					onChange={(e) => setLocalDescription(e.target.value)}
					placeholder={currentDescription}
					className="input flex-1 truncate text-sm text-muted-foreground"
				/>

				<div className="flex flex-row gap-1">
					<button type="submit" className="btn bg-primary text-primary-foreground" disabled={isPending}>
						<Icon icon="material-symbols:update" className="icon text-xl" />
						{isPending ? "Updating..." : "Update"}
					</button>
					<button type="button" className="btn bg-destructive text-destructive-foreground" onClick={handleReset}>
						<Icon icon="material-symbols:delete-history" className="icon text-xl" />
						Clear
					</button>
				</div>
			</form>

			{isSuccess && <p className="description-label text-primary">Description updated successfully!</p>}
			{error && <p className="description-label text-destructive">Failed to update description.</p>}
		</>
	)
}
