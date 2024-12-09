"use client"

import { Icon } from "@iconify/react"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch"

export default function Navbar() {
	const { data: session } = useSession()
	const slug = session?.user?.slug
	const image = session?.user?.image

	return (
		<div className="flex flex-col justify-center gap-4 font-semibold">
			<div className="content-container">
				<Link href="/" className="flex flex-row items-center justify-start gap-2">
					<Image src="/logo.png" alt="Logo" width={30} height={30} className="icon" />
					<span className="text-lg font-bold">LinkStack</span>
				</Link>
			</div>

			<div className="flex flex-row justify-between gap-2 md:flex-col">
				<Link href={`/${slug}`} className="flex flex-row items-center justify-start gap-2">
					{image && <Image src={image} alt={slug ?? "avatar"} width={40} height={40} className="rounded-full" />}
					<p className="truncate text-xs text-muted-foreground">@{slug}</p>
				</Link>
				<ThemeSwitch />
				<hr />
			</div>

			<div className="flex w-full flex-row justify-center gap-1 text-sm md:flex-col md:gap-2">
				<Link href="/dashboard" className="btn flex-col text-center md:flex-row">
					<Icon icon="material-symbols:view-timeline-outline" className="icon text-xl" />
					<p>My Links</p>
				</Link>
				<hr />

				<Link href="/dashboard/preferences" className="btn flex-col text-center md:flex-row">
					<Icon icon="material-symbols:settings-applications-outline" className="icon text-xl" />
					<p>Preferences</p>
				</Link>
				<hr />

				<Link href="/dashboard/analytics" className="btn flex-col text-center md:flex-row">
					<Icon icon="material-symbols:chart-data-outline" className="icon text-xl" />
					<p>Analytics</p>
				</Link>
				<hr />

				<button
					onClick={async () => await signOut({ redirect: true, callbackUrl: "/" })}
					className="btn flex-col text-center md:flex-row"
				>
					<Icon icon="material-symbols:logout" className="icon text-xl" />
					<p>Sign Out</p>
				</button>
			</div>
		</div>
	)
}
