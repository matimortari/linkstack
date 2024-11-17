// Test function to get a message from the server
export const getMessage = async () => {
	const res = await fetch("/api/hello")
	if (!res.ok) {
		throw new Error("Failed to fetch data")
	}
	return res.json()
}

// Get user data
export async function fetchUserData() {
	return fetch("/api/user", { method: "GET" })
}

// Get user settings
export async function fetchUserSettings(slug: any) {
	return fetch("/api/preferences", { method: "GET" })
}

// Get user links
export const getLinks = async () => {
	const res = await fetch("/api/links", { method: "GET" })
	if (!res.ok) {
		throw new Error("Failed to fetch links for the user")
	}
	return res.json()
}

// Add a new link
export const addLink = async (newLink: UserLink) => {
	const res = await fetch("/api/links", {
		method: "POST",
		headers: {
			"Content-Type": "application/json" // Add the header for JSON data
		},
		body: JSON.stringify(newLink) // Send the link data as JSON
	})
	if (!res.ok) {
		throw new Error("Failed to add new link")
	}
	return res.json()
}

// Update an existing link
export const updateLink = async (updatedLink: UserLink) => {
	const res = await fetch("/api/links", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(updatedLink)
	})
	if (!res.ok) {
		throw new Error("Failed to update link")
	}
	return res.json()
}

// Delete an existing link by ID
export async function deleteLink(id: string): Promise<string> {
	await fetch(`/api/links?id=${id}`, { method: "DELETE" })
	return id
}

// Get user social buttons
export const getButtons = async () => {
	const res = await fetch("/api/buttons", { method: "GET" })
	if (!res.ok) {
		throw new Error("Failed to fetch social buttons for the user")
	}
	return res.json()
}

// Add a new social button
export const addButton = async (newButton: UserButton) => {
	const res = await fetch("/api/buttons", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(newButton)
	})
	if (!res.ok) {
		throw new Error("Failed to add new button")
	}
	return res.json()
}

// Delete an existing social button by ID
export async function deleteButton(id: string): Promise<string> {
	await fetch(`/api/buttons?id=${id}`, { method: "DELETE" })
	return id
}

// Update user settings
export async function updateSettings(newSettings: object) {
	return fetch("/api/preferences", {
		method: "PUT",
		body: JSON.stringify(newSettings)
	})
}

// Reset user settings to default
export async function resetSettings() {
	return fetch("/api/preferences", {
		method: "PUT",
		body: JSON.stringify({})
	})
}

// Handle form submission
export async function handleFormSubmit({ e, url, payload, setSuccess, setError, onSuccess }) {
	e.preventDefault()

	try {
		await fetch(url, {
			method: "PUT",
			body: JSON.stringify(payload)
		})

		setSuccess("Updated successfully!")
		if (onSuccess) onSuccess()
	} catch (error) {
		console.error("Error submitting form:", error)
		setError("Failed to submit form.")
	}
}
