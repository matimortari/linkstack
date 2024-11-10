"use client"

import Navbar from "@/src/components/Navbar"
import useAuthRedirect from "@/src/hooks/useAuth"

export default function Preferences() {
	useAuthRedirect()

	return (
		<div className="flex min-h-screen md:flex-row">
			<aside className="p-4 md:w-2/12">
				<Navbar />
			</aside>

			<main className="border border-muted bg-card p-4 md:w-7/12">
				<h1 className="title">Dashboard</h1>
			</main>

			<aside className="p-4 md:w-3/12">
				<h1 className="title">Preview</h1>
			</aside>
		</div>
	)
}
