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

// export async function GET(req: NextRequest) {
// 	const slug = req.nextUrl.searchParams.get("slug")
// 	if (!slug) {
// 		return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
// 	}

// 	const user = await db.user.findUnique({ where: { slug } })
// 	if (!user) {
// 		return NextResponse.json({ error: "User not found" }, { status: 404 })
// 	}

// 	const userLinks = await db.userLink.findMany({ where: { userId: user.id } })
// 	return NextResponse.json(userLinks)

// POST method for creating a new user link
// export async function POST(req: NextRequest) {}

// PUT method for updating a user link
// export async function PUT(req: NextRequest) {}

// DELETE method for deleting a user link
// export async function DELETE(req: NextRequest) {}
