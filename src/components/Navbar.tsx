"use client"

import { Icon } from "@iconify/react"
import { signOut, useSession } from "next-auth/react"
import Image from "next/image"
import Link from "next/link"
import ThemeSwitch from "./ThemeSwitch"

export default function Navbar({ slug, image }) {
	const { data: session } = useSession()

	if (!session) {
		return <p className="text-sm text-muted-foreground">Loading...</p>
	}

	return (
		<>
			<div className="flex flex-row justify-between gap-4 pb-2 md:flex-col">
				<div className="flex w-fit flex-row justify-between gap-4 md:flex-col md:justify-center">
					<Link href="/" className="flex flex-row items-center justify-start gap-2">
						<Image
							src="/logo.png"
							alt="Logo"
							width={35}
							height={35}
							className="icon rounded-full border border-muted"
						/>
						<span className="hidden text-lg font-bold md:block">LinkStack</span>
					</Link>

					<Link href={`/${slug}`} className="flex flex-row items-center justify-start gap-2">
						{image && <Image src={image} alt={image} width={30} height={30} className="hidden rounded-full md:block" />}
						<p className="truncate text-xs font-medium text-muted-foreground">@{slug}</p>
					</Link>
				</div>

				<ThemeSwitch />
			</div>

			<div className="flex w-full flex-row justify-center gap-2 text-sm md:flex-col">
				<Link href="/dashboard" className="btn flex-col text-center md:flex-row">
					<Icon icon="material-symbols:view-timeline-outline" className="icon text-xl" />
					<p className="hidden md:block">My Profile</p>
				</Link>
				<hr />

				<Link href="/dashboard/preferences" className="btn flex-col text-center md:flex-row">
					<Icon icon="material-symbols:settings-applications-outline" className="icon text-xl" />
					<p className="hidden md:block">Preferences</p>
				</Link>
				<hr />

				<Link href="/dashboard/analytics" className="btn flex-col text-center md:flex-row">
					<Icon icon="material-symbols:chart-data-outline" className="icon text-xl" />
					<p className="hidden md:block">Analytics</p>
				</Link>
				<hr />

				<button
					onClick={async () => await signOut({ redirect: true, callbackUrl: "/" })}
					className="btn flex-col text-center md:flex-row"
				>
					<Icon icon="material-symbols:logout" className="icon text-xl" />
					<p className="hidden md:block">Sign Out</p>
				</button>
			</div>
		</>
	)
}
