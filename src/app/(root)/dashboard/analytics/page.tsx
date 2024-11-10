"use client"

import Navbar from "@/src/components/Navbar"
import useAuthRedirect from "@/src/hooks/useAuth"

export default function Analytics() {
	useAuthRedirect()

	return (
		<div className="flex min-h-screen md:flex-row">
			<aside className="p-4 md:w-2/12">
				<Navbar />
			</aside>

			<main className="dashboard-container md:w-7/12">
				<header className="mb-2 flex flex-col">
					<h1 className="title">Dashboard</h1>
					<span className="title-label">View your profile analytics.</span>
				</header>
				<hr />

				<div className="mt-2 flex flex-col">Main Content</div>
			</main>

			<aside className="p-4 md:w-3/12">
				<h1 className="title">Preview</h1>
			</aside>
		</div>
	)
}
