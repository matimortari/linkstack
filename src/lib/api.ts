import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"
import { authOptions } from "./auth"

// Helper function to get the session or return an unauthorized JSON response
export async function getSessionOrUnauthorized() {
	const session = await getServerSession(authOptions)
	if (!session || !session.user) {
		return { error: true, response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) }
	}

	return { error: false, session }
}

// Generic API request function
export const apiRequest = async (url: string, options: RequestInit) => {
	try {
		const res = await fetch(url, options)
		if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText || "Unknown error"}`)

		return res.json()
	} catch (error) {
		console.error("Network error:", error)
		throw new Error("Network error occurred. Please try again later.")
	}
}
