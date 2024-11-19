import { useUpdateSlug } from "@/src/hooks/useMutations"
import { Icon } from "@iconify/react"
import { useState } from "react"

export default function UpdateSlugForm() {
	const [slug, setSlug] = useState("")
	const { mutate, isPending, error, isSuccess } = useUpdateSlug()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		mutate(slug)
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="form-container my-4 flex flex-row items-center gap-2">
				<input
					type="text"
					value={slug}
					onChange={(e) => setSlug(e.target.value)}
					placeholder="Enter new slug"
					className="input flex-1 truncate text-muted-foreground"
					required
				/>

				<button type="submit" className="btn bg-primary text-primary-foreground" disabled={isPending}>
					<Icon icon="material-symbols:update" className="icon text-xl" />
					{isPending ? "Updating..." : "Update"}
				</button>
			</form>

			{isSuccess && <p className="mt-2 font-bold text-primary">Slug updated successfully!</p>}
			{error && <p className="mt-2 font-bold text-destructive">{(error as Error).message}</p>}
		</>
	)
}
