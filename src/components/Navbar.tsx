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
			<div className="content-container flex flex-row gap-2">
				<Image src="/logo.png" alt="Logo" width={25} height={25} className="icon" />
				<span className="text-lg font-bold">LinkStack</span>
			</div>

			<Link href={`/${slug}`} className="flex flex-row items-center justify-start gap-2">
				{image && <Image src={image} alt={slug ?? "avatar"} width={35} height={35} className="rounded-full" />}
				<p className="truncate text-xs text-muted-foreground">@{slug}</p>
			</Link>

			<ThemeSwitch />
			<hr />

			<div className="flex w-full flex-col justify-center gap-2 text-sm">
				<Link href="/dashboard" className="btn">
					<Icon icon="material-symbols:view-timeline-outline" className="icon text-xl" />
					<p>My Links</p>
				</Link>
				<hr />

				<Link href="/dashboard/preferences" className="btn">
					<Icon icon="material-symbols:settings-applications-outline" className="icon text-xl" />
					<p>Preferences</p>
				</Link>
				<hr />

				<Link href="/dashboard/analytics" className="btn">
					<Icon icon="material-symbols:chart-data-outline" className="icon text-xl" />
					<p>Analytics</p>
				</Link>
				<hr />

				<button onClick={async () => await signOut({ redirect: true, callbackUrl: "/" })} className="btn">
					<Icon icon="material-symbols:logout" className="icon text-xl" />
					<p>Sign Out</p>
				</button>
			</div>
		</div>
	)
}
