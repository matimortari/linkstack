"use client"

import AnalyticsGraphs from "@/src/components/lists/AnalyticsGraphs"
import AnalyticsSummary from "@/src/components/lists/AnalyticsSummary"
import ClicksByLink from "@/src/components/lists/ClicksByLink"
import Navbar from "@/src/components/Navbar"
import Preview from "@/src/components/Preview"
import useAuthRedirect from "@/src/hooks/useAuthRedirect"

export default function Analytics() {
	useAuthRedirect()

	return (
		<div className="flex min-h-screen md:flex-row">
			<aside className="p-4 md:w-2/12">
				<Navbar />
			</aside>

			<main className="content-container md:w-7/12">
				<header className="mb-2 flex flex-col">
					<h1 className="title">Analytics</h1>
					<span className="description-label">View your profile analytics.</span>
				</header>
				<hr />

				<div className="flex flex-col">
					<div className="my-4 flex flex-col">
						<h2 className="subtitle">Analytics Summary</h2>
						<p className="description-label text-muted-foreground">Your key metrics.</p>
						<AnalyticsSummary />
					</div>
					<hr />

					<AnalyticsGraphs />
					<hr />

					<div className="my-4 flex flex-col">
						<h2 className="subtitle">Clicks by Link</h2>
						<p className="description-label text-muted-foreground">Your most clicked links & social buttons.</p>
						<ClicksByLink />
					</div>
					<hr />
				</div>
			</main>

			<aside className="p-4 md:w-3/12">
				<h1 className="title">Preview</h1>
				<Preview />
			</aside>
		</div>
	)
}
