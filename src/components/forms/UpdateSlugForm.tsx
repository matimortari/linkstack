import { useState } from "react"

export default function UpdateSlugForm() {
	const [slug, setSlug] = useState("")
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [success, setSuccess] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		setError(null)
		setSuccess(false)
	}

	return (
		<form onSubmit={handleSubmit} className="form-container my-4 flex flex-row items-center gap-2">
			<input
				type="text"
				value={slug}
				onChange={(e) => setSlug(e.target.value)}
				placeholder="Enter new slug"
				className="input flex-1 truncate text-muted-foreground"
			/>

			{error && <p className="mb-2 text-sm text-destructive">{error}</p>}
			{success && <p className="mb-2 text-sm text-accent">Slug updated successfully!</p>}

			<button type="submit" className={`btn ${loading ? "bg-accent" : "bg-accent"}`} disabled={loading}>
				{loading ? "Updating..." : "Update"}
			</button>
		</form>
	)
}
