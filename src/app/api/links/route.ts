import { getSessionOrUnauthorized } from "@/src/lib/api"
import { db } from "@/src/lib/db"
import { NextRequest, NextResponse } from "next/server"

// GET method for fetching user links
export async function GET(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response // Return unauthorized response if session fails

	const userLinks = await db.userLink.findMany({
		where: { userId: session.user.id }
	})
	if (!userLinks) {
		return NextResponse.json({ error: "User Links not found" }, { status: 404 })
	}
	return NextResponse.json(userLinks, { status: 200 })
}

// POST method for creating a new user link
export async function POST(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const { title, url } = await req.json()
	if (!title || !url) return NextResponse.json({ error: "Invalid input" }, { status: 400 })

	const newLink = await db.userLink.create({
		data: { title, url, userId: session.user.id }
	})

	return NextResponse.json(newLink)
}

// PUT method for updating a user link
// export async function PUT(req: NextRequest) {}

// DELETE method for deleting a user link
// export async function DELETE(req: NextRequest) {}