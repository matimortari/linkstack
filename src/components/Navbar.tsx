"use client"

import { Icon } from "@iconify/react"
import { signOut } from "next-auth/react"
import Link from "next/link"

export default function Navbar() {
	return (
		<div className="flex flex-col justify-center gap-4 font-semibold">
			<div className="rounded-2xl border border-muted p-2">
				<p className="text-lg font-bold">LinkSphere</p>
			</div>
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
