"use client"

import { useSession } from "next-auth/react"
import Image from "next/image"
import UserButton from "./UserButton"
import UserLink from "./UserLink"

export default function Preview() {
	const { data: session } = useSession()

	// Loading state
	if (!session) {
		return <p className="text-sm text-muted-foreground">Loading Preview...</p>
	}

	// Destructure required properties
	const { description, links, image, buttons, settings, slug, id: userId } = session.user || {}

	return (
		<div
			className="content-container mx-auto my-2 w-full overflow-hidden"
			style={{ backgroundColor: settings?.backgroundColor }}
		>
			<div className="flex flex-col items-center justify-center gap-2 py-5 text-center">
				{image && <Image src={image} alt={slug} width={80} height={80} className="icon rounded-full" />}
				<h1
					className="text-center"
					style={{
						color: settings?.slugTextColor,
						fontWeight: settings?.slugTextWeight,
						fontSize: settings?.slugTextSize
					}}
				>
					@{slug}
				</h1>

				{description && (
					<p className="text-center" style={{ color: settings?.headerTextColor }}>
						{description}
					</p>
				)}

				{buttons && buttons.length > 0 ? (
					<ul className="my-2 flex flex-row justify-center gap-2">
						{buttons.map((button) => (
							<UserButton
								key={button.id}
								url={button.url}
								icon={button.icon}
								settings={settings}
								buttonId={button.id}
								userId={userId}
							/>
						))}
					</ul>
				) : (
					<hr />
				)}

				{links && links.length > 0 ? (
					<ul className="space-y-4">
						{links.map((link) => (
							<UserLink
								key={link.id}
								url={link.url}
								title={link.title}
								settings={settings}
								linkId={link.id}
								userId={userId}
							/>
						))}
					</ul>
				) : (
					<p className="text-center text-muted-foreground">No links yet.</p>
				)}
			</div>
		</div>
	)
}
