import useDialog from "@/src/hooks/useDialog"
import { updateLink } from "@/src/lib/actions"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"

export default function UpdateLinkDialog({ onClose, linkData }) {
	const { dialogRef, setError, error } = useDialog(onClose)
	const [title, setTitle] = useState("")
	const [url, setUrl] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	// Initialize form with current link data
	useEffect(() => {
		if (linkData) {
			setTitle(linkData.title)
			setUrl(linkData.url)
		}
	}, [linkData])

	const { mutate: updateExistingLink } = useMutation({
		mutationFn: updateLink,
		onSuccess: () => {
			// Close the dialog and reset form state
			onClose()
			setTitle("")
			setUrl("")
		},
		onError: (error: any) => {
			setError(error.message || "Failed to update the link")
		}
	})

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!title || !url) {
			setError("Both fields are required")
			return
		}

		if (!linkData?.id) {
			setError("Link ID is missing")
			return
		}

		setIsLoading(true)
		try {
			await updateExistingLink({ ...linkData, title, url })
		} catch (error) {
			setError("Failed to update the link")
		}
	}

	return (
		<div className="expand-dialog fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
			<div ref={dialogRef} className="content-container w-full max-w-xl shadow-lg">
				<h2 className="title mb-2">Update Link</h2>

				<form onSubmit={handleSubmit} className="w-full">
					<div className="mb-4 flex flex-col gap-4">
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							placeholder="Link title"
							className="form-container"
						/>
						<input
							type="url"
							value={url}
							onChange={(e) => setUrl(e.target.value)}
							placeholder="Link URL"
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
							{isLoading ? "Updating..." : "Update Link"}
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
