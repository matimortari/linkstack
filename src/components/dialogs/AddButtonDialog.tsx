import useDialog from "@/src/hooks/useDialog"
import { addButton } from "@/src/lib/actions"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"

export default function AddButtonDialog({ onClose }) {
	const { dialogRef, setError, error } = useDialog(onClose)
	const [platform, setPlatform] = useState("")
	const [icon, setIcon] = useState("")
	const [url, setUrl] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const { mutate: addNewButton } = useMutation({
		mutationFn: addButton,
		onSuccess: () => {
			onClose()
			setPlatform("")
			setIcon("")
			setUrl("")
		},
		onError: (error: any) => {
			setError(error.message || "Failed to add the button")
		}
	})

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		if (!platform || !icon || !url) {
			setError("All fields are required")
			return
		}

		setIsLoading(true)
		addNewButton({ platform, icon, url, clicks: 0 })
	}

	return (
		<div className="expand-dialog fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div ref={dialogRef} className="content-container w-full max-w-xl shadow-lg">
				<h2 className="title mb-2">Add Button</h2>

				<form onSubmit={handleSubmit} className="w-full">
					<div className="mb-4 flex flex-col gap-4">
						<input
							type="text"
							value={platform}
							onChange={(e) => setPlatform(e.target.value)}
							placeholder="Button platform"
							className="form-container"
						/>
						<input
							type="text"
							value={icon}
							onChange={(e) => setIcon(e.target.value)}
							placeholder="Button icon"
							className="form-container"
						/>
						<input
							type="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							placeholder="Button URL"
							className="form-container"
						/>
					</div>

					{error && (
						<div className="mb-4 text-sm text-destructive">
							<p>{error}</p>
						</div>
					)}

					<div className="flex flex-row gap-2">
						<button type="submit" className="btn bg-primary text-primary-foreground" disabled={isLoading}>
							{isLoading ? "Adding..." : "Add Link"}
						</button>
						<button onClick={onClose} className="btn">
							Cancel
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
