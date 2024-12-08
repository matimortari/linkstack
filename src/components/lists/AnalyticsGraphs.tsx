"use client"

import { getAnalytics } from "@/src/lib/analytics"
import { useQuery } from "@tanstack/react-query"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function AnalyticsGraphs() {
	const { data: stats } = useQuery({ queryKey: ["analytics"], queryFn: getAnalytics })

	return (
		<div className="flex flex-col">
			<div className="my-4 flex flex-col">
				<h2 className="subtitle">Profile Views</h2>
				<p className="description-label text-muted-foreground">Total views of your profile page over time.</p>
				<ResponsiveContainer width="100%" height={200}>
					<LineChart data={stats} margin={{ top: 20, right: 30, left: 20, bottom: 10 }} className="text-xs">
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="date" className="text-xs" />
						<YAxis />
						<Tooltip />
						<Line type="monotone" dataKey="views" stroke="#3d6a85" activeDot={{ r: 8 }} />
					</LineChart>
				</ResponsiveContainer>
			</div>
			<hr />

			<div className="my-4 flex flex-row justify-between">
				<div className="flex-1">
					<h2 className="subtitle">Link Clicks</h2>
					<p className="description-label text-muted-foreground">Total clicks on your links over time.</p>
					<ResponsiveContainer width="100%" height={200}>
						<BarChart data={stats} margin={{ top: 20, right: 30, left: 20, bottom: 10 }} className="text-xs">
							<XAxis dataKey="date" className="text-xs" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="linkClicks" fill="#6a983c" barSize={20} />
						</BarChart>
					</ResponsiveContainer>
				</div>

				<div className="flex-1">
					<h2 className="subtitle">Button Clicks</h2>
					<p className="description-label text-muted-foreground">Total clicks on your social buttons over time.</p>
					<ResponsiveContainer width="100%" height={200}>
						<BarChart data={stats} margin={{ top: 20, right: 30, left: 20, bottom: 10 }} className="text-xs">
							<XAxis dataKey="date" className="text-xs" />
							<YAxis />
							<Tooltip />
							<Bar dataKey="buttonClicks" fill="#d96e2c" barSize={20} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</div>
		</div>
	)
}
