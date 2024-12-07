import { db } from "./db"

// Track a page visit based on the user's slug
export async function trackPageVisit(slug: string) {
	const user = await db.user.findUnique({
		where: { slug },
		include: { userStats: true }
	})

	if (!user) return

	const today = new Date().toISOString().split("T")[0]

	const stats =
		user.userStats.find((stat) => stat.date.toISOString().split("T")[0] === today) ||
		(await db.userStats.create({
			data: {
				userId: user.id,
				date: new Date(),
				views: 0,
				linkClicks: 0,
				buttonClicks: 0
			}
		}))

	await db.userStats.update({
		where: { id: stats.id },
		data: { views: stats.views + 1 }
	})
}

// Track a user click (link or button)
export async function trackClick(id: string, type: "link" | "button", userId: string) {
	try {
		await fetch("/api/analytics", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ id, type, userId })
		})
	} catch (error) {
		console.error("Error tracking click:", error)
	}
}
