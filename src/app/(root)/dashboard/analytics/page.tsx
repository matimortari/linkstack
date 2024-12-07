"use client"

import Navbar from "@/src/components/Navbar"
import Preview from "@/src/components/Preview"
import useAuthRedirect from "@/src/hooks/useAuthRedirect"
import { getAnalytics } from "@/src/lib/analytics"
import { useQuery } from "@tanstack/react-query"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function Analytics() {
	useAuthRedirect()

	const { data: stats } = useQuery({ queryKey: ["analytics"], queryFn: getAnalytics })

	return (
		<div className="flex min-h-screen md:flex-row">
			<aside className="p-4 md:w-2/12">
				<Navbar />
			</aside>

			<main className="content-container md:w-7/12">
				<header className="mb-2 flex flex-col">
					<h1 className="title">Dashboard</h1>
					<span className="title-label">View your profile analytics.</span>
				</header>
				<hr />

				<div className="flex flex-col">
					<div className="my-4 flex flex-col">
						<h2 className="subtitle">Profile Views</h2>
						<p className="description-label text-muted-foreground">Total views of your profile page over time.</p>

						<ResponsiveContainer width="100%" height={200}>
							<LineChart data={stats} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" className="text-xs" />
								<YAxis />
								<Tooltip />
								<Line type="monotone" dataKey="views" stroke="#3d6a85" activeDot={{ r: 8 }} />
							</LineChart>
						</ResponsiveContainer>
					</div>
					<hr />

					<div className="my-4 flex flex-col">
						<h2 className="subtitle">Link Clicks</h2>
						<p className="description-label text-muted-foreground">Total clicks on your links over time.</p>
						<ResponsiveContainer width="100%" height={200}>
							<LineChart data={stats} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" className="text-xs" />
								<YAxis />
								<Tooltip />
								<Line type="monotone" dataKey="linkClicks" stroke="#458a7c" activeDot={{ r: 8 }} />
							</LineChart>
						</ResponsiveContainer>
					</div>
					<hr />

					<div className="my-4 flex flex-col">
						<h2 className="subtitle">Button Clicks</h2>
						<p className="description-label text-muted-foreground">Total clicks on your social buttons over time.</p>
						<ResponsiveContainer width="100%" height={200}>
							<LineChart data={stats} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
								<CartesianGrid strokeDasharray="3 3" />
								<XAxis dataKey="date" className="text-xs" />
								<YAxis />
								<Tooltip />
								<Line type="monotone" dataKey="buttonClicks" stroke="#458a7c" activeDot={{ r: 8 }} />
							</LineChart>
						</ResponsiveContainer>
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
