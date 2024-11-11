import useDialog from "@/src/hooks/useDialog"

export default function AddLinkDialog({ onClose }) {
	const { dialogRef, setError } = useDialog(onClose)

	return (
		<div className="content-container fixed inset-0 z-50">
			<div className="flex flex-col items-center justify-center gap-2">
				<h2 className="title">Add Link</h2>

				<button onClick={onClose} className="btn">
					Cancel
				</button>
			</div>
		</div>
	)
}
