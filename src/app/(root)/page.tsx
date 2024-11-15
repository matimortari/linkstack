"use client"

import { getMessage } from "@/src/lib/actions"
import { Icon } from "@iconify/react"
import { useQuery } from "@tanstack/react-query"
import { useSession } from "next-auth/react"
import { Bowlby_One } from "next/font/google"
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation"

const bowlby = Bowlby_One({ subsets: ["latin"], weight: "400" })

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
		<div className="content-container relative min-h-screen overflow-hidden">
			<div className="absolute inset-x-0 bottom-0 opacity-50 md:h-3/6">
				<Image src="/grid-bg.png" alt="Background" fill />
			</div>

			<div className="relative flex w-full items-center justify-between">
				<div className="flex flex-row items-center gap-2">
					<Image src="/logo.png" alt="Logo" width={25} height={25} className="icon" />
					<span className="text-lg font-bold">LinkStack</span>
				</div>
				<Link href="/login" className="btn">
					<Icon icon="material-symbols:login" width={25} height={25} className="icon" />
				</Link>
			</div>

			<main className="flex flex-col items-center justify-center gap-8 p-8 md:flex-row md:gap-32 md:p-12">
				<section className="z-50 flex w-full max-w-xl flex-col md:w-1/2">
					<div className="flex flex-col items-center gap-4 p-4 text-center md:items-start md:text-start">
						<h1 className={`text-3xl md:text-5xl ${bowlby.className}`}>Keep all your stuff together!</h1>
						<h2 className={`text-xl md:text-2xl ${bowlby.className}`}>Your link-in-bio page 🔗</h2>
						<p>
							Welcome to <strong>LinkSphere</strong>! Share your links, social profiles, contact info, and more in one
							page. Create and customize your page and share it with your audience.
						</p>

						<form className="form-container">
							<span className="text-muted-foreground">linksphere-live.vercel.app/</span>
							<input type="text" placeholder="your_name" className="input flex-1" />
							<Link href="/login" className="btn bg-primary text-primary-foreground">
								Get Started!
							</Link>
						</form>
					</div>
				</section>

				<section className="z-50 flex w-full max-w-xl flex-col items-center justify-center md:w-1/2">
					<div className="flex flex-col">
						<button className="btn rounded-md px-4 py-2" onClick={() => refetch()}>
							Preview
						</button>
						{data && <p className="mt-4">Message: {data.message}</p>}
					</div>
				</section>
			</main>
		</div>
	)
}
