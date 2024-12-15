import { db } from "@/src/lib/db"
import { getSessionOrUnauthorized } from "@/src/lib/utils"
import { NextRequest, NextResponse } from "next/server"

// GET method for getting user analytics data
export async function GET(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const analyticsData = await db.userStats.findMany({ where: { userId: session.user.id } })
	if (!analyticsData) {
		return NextResponse.json({ error: "Analytics data not found" }, { status: 404 })
	}

	return NextResponse.json(analyticsData, { status: 200 })
}

export async function POST(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const { id, type } = await req.json()

	// Format today's date to match the format in the UserStats table (YYYY-MM-DD)
	const today = new Date().toISOString().split("T")[0]

	// Create a new record based on type (link or button)
	if (type === "link") {
		await db.linkClick.create({
			data: {
				userLinkId: parseInt(id),
				count: 1,
				date: new Date()
			}
		})

		await db.userLink.update({
			where: { id: parseInt(id) },
			data: { clicks: { increment: 1 } }
		})
	} else if (type === "button") {
		await db.buttonClick.create({
			data: {
				userButtonId: parseInt(id),
				count: 1,
				date: new Date()
			}
		})

		await db.userButton.update({
			where: { id: parseInt(id) },
			data: { clicks: { increment: 1 } }
		})
	}

	// Check if stats for the user and today already exist
	const userStats = await db.userStats.findFirst({
		where: {
			userId: session.user.id,
			date: new Date(today)
		}
	})

	// If stats exist, update the appropriate click count. If not, create a new record
	if (userStats) {
		if (type === "link") {
			await db.userStats.update({
				where: {
					id: userStats.id
				},
				data: {
					linkClicks: { increment: 1 }
				}
			})
		} else if (type === "button") {
			await db.userStats.update({
				where: {
					id: userStats.id
				},
				data: {
					buttonClicks: { increment: 1 }
				}
			})
		}
	} else {
		const newStatsData = {
			userId: session.user.id,
			date: new Date(today)
		}

		if (type === "link") {
			await db.userStats.create({
				data: {
					...newStatsData,
					linkClicks: 1
				}
			})
		} else if (type === "button") {
			await db.userStats.create({
				data: {
					...newStatsData,
					buttonClicks: 1
				}
			})
		}
	}

	return NextResponse.json({ message: "Click tracked successfully!" }, { status: 200 })
}
