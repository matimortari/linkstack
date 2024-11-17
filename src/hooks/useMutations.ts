import { addButton, addLink, deleteButton, deleteLink, updateLink } from "@/src/lib/actions"
import { useMutation, useQueryClient } from "@tanstack/react-query"

// Hook to add a new link
export function useAddLink({ onClose }) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["addLink"],
		mutationFn: addLink,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] })
			if (onClose) onClose()
		},
		onError: (error) => {
			console.error("Error adding link:", error)
		}
	})
}

// Hook to update a link
export function useUpdateLink({ onClose }) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["updateLink"],
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

// Hook to delete a link
export function useDeleteLink() {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["deleteLink"],
		mutationFn: (id: string) => deleteLink(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["links"] })
		},
		onError: (error) => {
			console.error("Error deleting link:", error)
		}
	})
}

// Hook to add a new social button
export function useAddButton({ onClose }) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationKey: ["addButton"],
		mutationFn: addButton,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["buttons"] })
			if (onClose) onClose()
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
		mutationKey: ["deleteButton"],
		mutationFn: (id: string) => deleteButton(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["buttons"] })
		},
		onError: (error) => {
			console.error("Error deleting button:", error)
		}
	})
}
