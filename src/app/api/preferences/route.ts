import { getSessionOrUnauthorized } from "@/src/lib/api"
import { db } from "@/src/lib/db"
import { NextRequest, NextResponse } from "next/server"

// GET method for fetching user settings
export async function GET(req: NextRequest) {
	const { error, session, response } = await getSessionOrUnauthorized()
	if (error) return response

	const settings = await db.userSettings.findUnique({
		where: { userId: session.user.id }
	})
	if (!settings) {
		return NextResponse.json({ error: "Settings not found" }, { status: 404 })
	}
	return NextResponse.json(settings, { status: 200 })
}

// PUT method for updating user settings or resetting to default
// export async function PUT(req: NextRequest) {}
