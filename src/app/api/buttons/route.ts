import { getSessionOrUnauthorized } from "@/src/lib/api"
import { db } from "@/src/lib/db"
import { NextRequest, NextResponse } from "next/server"

// GET method for fetching user social buttons
export async function GET(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response // Return unauthorized response if session fails

	const userButtons = await db.userButton.findMany({
		where: { userId: session.user.id }
	})
	if (!userButtons) {
		return NextResponse.json({ error: "User Social Buttons not found" }, { status: 404 })
	}
	return NextResponse.json(userButtons, { status: 200 })
}

// POST method for creating a new user social button
export async function POST(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const { platform, url, icon } = await req.json()
	if (!platform || !url || !icon) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

	const newButton = await db.userButton.create({
		data: { platform, url, icon, userId: session.user.id }
	})

	return NextResponse.json(newButton)
}

// PUT method for updating a user social button
// export async function PUT(req: NextRequest) {}

// DELETE method for deleting a user social button
// export async function DELETE(req: NextRequest) {}