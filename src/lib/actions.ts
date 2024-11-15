// Test function to gert a message from the server
export const getMessage = async () => {
	const res = await fetch("/api/hello")
	if (!res.ok) {
		throw new Error("Failed to fetch data")
	}

	return res.json()
}

// Get user links
export const getLinks = async () => {
	const res = await fetch("/api/links", { method: "GET" })
	if (!res.ok) {
		throw new Error("Failed to fetch links for the user")
	}
	return res.json()
}

// Get user social buttons
export const getButtons = async () => {
	const res = await fetch("/api/buttons", { method: "GET" })
	if (!res.ok) {
		throw new Error("Failed to fetch social buttons for the user")
	}
	return res.json()
}

// Add a new link
export const addLink = async (newLink: UserLink) => {
	const res = await fetch("/api/links", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(newLink)
	})

	if (!res.ok) {
		throw new Error("Failed to add link for the user")
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
		throw new Error("Failed to add social button for the user")
	}

	return res.json()
}
