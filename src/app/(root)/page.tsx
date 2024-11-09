"use client"

import { useQuery } from "@tanstack/react-query"

const getMessage = async () => {
	const response = await fetch("/api/hello")
	if (!response.ok) throw new Error("Failed to fetch data")
	return response.json()
}

export default function Home() {
	const { data, refetch } = useQuery({
		queryKey: ["get-message"],
		queryFn: getMessage,
		enabled: false
	})

	return (
		<div className="m-8 flex h-screen flex-col items-center">
			<button className="button" onClick={() => refetch()}>
				Hello LinkStack!
			</button>

			{data?.message && (
				<div className="m-4">
					<strong>{data.message}</strong>
				</div>
			)}
		</div>
	)
}
