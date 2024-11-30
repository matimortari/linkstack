import { db } from "@/src/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	try {
		const { id, type, userId } = await req.json()

		// Format today's date to match the format in the UserStats table
		const today = new Date().toISOString().split("T")[0] // Format: 'YYYY-MM-DD'

		// Create a new record based on type (link or button)
		if (type === "link") {
			// Create a new link click record
			await db.linkClick.create({
				data: {
					userLinkId: parseInt(id),
					count: 1,
					date: new Date()
				}
			})

			// Update the UserLink table to increment the total click count
			await db.userLink.update({
				where: { id: parseInt(id) },
				data: { clicks: { increment: 1 } }
			})
		} else if (type === "button") {
			// Create a new button click record
			await db.buttonClick.create({
				data: {
					userButtonId: parseInt(id),
					count: 1,
					date: new Date()
				}
			})

			// Update the UserButton table to increment the total click count
			await db.userButton.update({
				where: { id: parseInt(id) },
				data: { clicks: { increment: 1 } }
			})
		}

		// Check if stats for this user and today already exist
		const userStats = await db.userStats.findFirst({
			where: {
				userId,
				date: new Date(today) // Compare with today's date
			}
		})

		if (userStats) {
			// If stats exist, update the appropriate click count
			if (type === "link") {
				await db.userStats.update({
					where: {
						id: userStats.id // Use the existing record ID to update it
					},
					data: {
						linkClicks: { increment: 1 } // Increment the linkClicks by 1
					}
				})
			} else if (type === "button") {
				await db.userStats.update({
					where: {
						id: userStats.id // Use the existing record ID to update it
					},
					data: {
						buttonClicks: { increment: 1 } // Increment the buttonClicks by 1
					}
				})
			}
		} else {
			// If no stats exist, create a new record
			const newStatsData = {
				userId,
				date: new Date(today) // Set today's date
			}

			if (type === "link") {
				// For link click, initialize the linkClicks to 1
				await db.userStats.create({
					data: {
						...newStatsData,
						linkClicks: 1
					}
				})
			} else if (type === "button") {
				// For button click, initialize the buttonClicks to 1
				await db.userStats.create({
					data: {
						...newStatsData,
						buttonClicks: 1
					}
				})
			}
		}

		return NextResponse.json({ message: "Click tracked successfully!" }, { status: 200 })
	} catch (error) {
		return NextResponse.json({ error: "Failed to track click" }, { status: 500 })
	}
}
