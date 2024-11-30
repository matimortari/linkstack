"use client"

import { useUpdateDescription } from "@/src/hooks/useMutations"
import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function UpdateHeaderForm() {
	const [localDescription, setLocalDescription] = useState("") // Controlled input value
	const [currentDescription, setCurrentDescription] = useState("") // Placeholder for the current description
	const { data: session } = useSession() // Fetch session data
	const { mutate, isPending, error, isSuccess } = useUpdateDescription()

	// Fetch current description from user session or API
	useEffect(() => {
		if (session) {
			// Assuming the current description is part of the session user object
			setCurrentDescription(session.user.description || "Enter new header description") // Default if description is not available
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
					placeholder={currentDescription} // Display current description as placeholder
					className="input flex-1 truncate text-muted-foreground"
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

			{isSuccess && <p className="mt-2 font-bold text-primary">Description updated successfully!</p>}
			{error && <p className="mt-2 font-bold text-destructive">{(error as Error).message}</p>}
		</>
	)
}
