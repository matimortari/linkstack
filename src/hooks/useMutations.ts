import { addButton, addLink, deleteButton, deleteLink, updateLink } from "@/src/lib/actions"
import { useMutation, useQueryClient } from "@tanstack/react-query"

// Hook to add a new link
export function useAddLink({ onClose }) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: addLink,
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["links"] }) // Invalidate the query for links
			if (onClose) onClose() // Close the dialog when the link is added
		},
		onError: (error) => {
			console.error("Error adding link:", error)
		}
	})
}

// Hook to update a user link
export function useUpdateLink({ onClose }) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: updateLink,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] })

			onClose()
		},
		onError: (error) => {
			console.error("Error updating link:", error)
		}
	})
}

// Hook to delete a user link
export function useDeleteLink() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => deleteLink(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] }) // Invalidate the query for links
		},
		onError: (error) => {
			console.error("Error deleting link:", error)
		}
	})
}

// Hook to add a new social button
export function useAddButton({ onClose }) {
	return useMutation({
		mutationFn: addButton,
		onSuccess: (data) => {
			if (onClose) onClose() // Close the dialog when the button is added
		},
		onError: (error) => {
			console.error("Error adding button:", error)
		}
	})
}

// Hook to delete a social button
export function useDeleteButton() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (id: string) => deleteButton(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["buttons"] })
		},
		onError: (error) => {
			console.error("Error deleting button:", error)
		}
	})
}
