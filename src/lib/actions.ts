// This file contains the actions that are used to fetch data from the server

export const getMessage = async () => {
	const res = await fetch("/api/hello")
	if (!res.ok) {
		throw new Error("Failed to fetch data")
	}

	return res.json()
}

export const getLinks = async () => {
	const res = await fetch("/api/links")
	if (!res.ok) {
		throw new Error("Failed to fetch links for the user.")
	}
	return res.json()
}

export const getButtons = async () => {
	const res = await fetch("/api/buttons")
	if (!res.ok) {
		throw new Error("Failed to fetch social buttons for the user.")
	}
	return res.json()
}
