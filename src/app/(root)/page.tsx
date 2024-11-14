"use client"

import { Icon } from "@iconify/react"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

const getMessage = async () => {
	const response = await fetch("/api/hello")
	if (!response.ok) throw new Error("Failed to fetch data")
	return response.json()
}

export default function Home() {
	const { status } = useSession()

	if (status === "authenticated") {
		redirect("/dashboard")
	}

	const { data, refetch } = useQuery({
		queryKey: ["get-message"],
		queryFn: getMessage,
		enabled: false
	})

	return (
		<div className="content-container min-h-screen">
			<div className="absolute inset-x-0 bottom-0 opacity-50 md:h-3/6">
				<Image src="/grid-bg.png" alt="Background" fill className="rounded-2xl" />
			</div>

			<Link href="/login" className="btn h-10 w-10">
				<Icon icon="material-symbols:login" />
			</Link>

			<main className="flex flex-col items-center justify-center gap-4 md:flex-row">
				<section className="flex items-center justify-center">1</section>

				<section className="flex items-center justify-center">2</section>
			</main>
		</div>
	)
}
