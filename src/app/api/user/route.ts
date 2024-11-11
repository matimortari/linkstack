import { getSessionOrUnauthorized } from "@/src/lib/api"
import { db } from "@/src/lib/db"
import { NextRequest, NextResponse } from "next/server"

// GET method for fetching user data
export async function GET(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const slug = session.user?.slug
	if (!slug) {
		return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
	}

	const user = await db.user.findUnique({ where: { slug } })
	if (!user) {
		return NextResponse.json({ error: "User not found" }, { status: 404 })
	}

	return NextResponse.json(user, { status: 200 })
}

// PUT method for updating user data
// export async function PUT(req: NextRequest) {}

// DELETE method for deleting user account
// export async function DELETE(req: NextRequest) {}
