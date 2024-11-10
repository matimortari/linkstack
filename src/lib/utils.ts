export function generateSlug(base: string = "", isInitial: boolean = false, length: number = 6) {
	const randomString = () =>
		Math.random()
			.toString(36)
			.substring(2, 2 + length)

	return isInitial
		? `${base
				.toLowerCase()
				.replace(/\s+/g, "-")
				.replace(/[^a-z0-9-]/g, "")}-${randomString()}`
		: `${randomString()}-${randomString()}`
}

export function formatDate(dateString) {
	const date = new Date(dateString)
	const formattedDate = date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric"
	})

	return formattedDate.charAt(0).toLowerCase() + formattedDate.slice(1)
}
