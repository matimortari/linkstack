import { useState } from "react"

export default function UpdateHeaderForm() {
	const [description, setDescription] = useState("")
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
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				placeholder="Enter new header description"
				className="input flex-1 truncate text-muted-foreground"
			/>

			{error && <p className="mb-2 text-sm text-destructive">{error}</p>}
			{success && <p className="mb-2 text-sm text-accent">Description updated successfully!</p>}

			<button type="submit" className={`btn ${loading ? "bg-accent" : "bg-accent"}`} disabled={loading}>
				{loading ? "Updating..." : "Update"}
			</button>
		</form>
	)
}
