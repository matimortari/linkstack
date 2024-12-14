"use client"

import UpdateHeaderForm from "@/src/components/forms/UpdateHeaderForm"
import UpdateSlugForm from "@/src/components/forms/UpdateSlugForm"
import ButtonList from "@/src/components/lists/ButtonList"
import LinkList from "@/src/components/lists/LinkList"
import Navbar from "@/src/components/Navbar"
import Preview from "@/src/components/Preview"
import useUser from "@/src/hooks/useUser"

export default function Dashboard() {
	const { session, slug, setSlug, description, setDescription, image, settings } = useUser()

	return (
		<div className="flex min-h-screen flex-col md:flex-row">
			<aside className="p-4 md:w-2/12">
				<Navbar slug={slug} image={image} />
			</aside>

			<main className="content-container md:w-7/12">
				<header className="mb-2 flex flex-col">
					<h1 className="title">Dashboard</h1>
					<span className="description-label">
						Welcome back, <span className="font-bold text-primary">{session?.user?.name}</span>!
					</span>
				</header>
				<hr />

				<div className="flex flex-col">
					<div className="my-4 flex flex-col">
						<h2 className="subtitle">Update Slug</h2>
						<p className="description-label text-muted-foreground">Customize your profile URL.</p>
						<UpdateSlugForm setSlug={setSlug} />
					</div>
					<hr />

					<div className="my-4 flex flex-col">
						<h2 className="subtitle">Update Header</h2>
						<p className="description-label text-muted-foreground">Update the description for your profile header.</p>
						<UpdateHeaderForm setDescription={setDescription} />
					</div>
					<hr />

					<div className="my-4 flex flex-col">
						<h2 className="subtitle">My Links</h2>
						<p className="description-label text-muted-foreground">Manage your links.</p>
						<LinkList />
					</div>
					<hr />

					<div className="my-4 flex flex-col">
						<h2 className="subtitle">My Social Buttons</h2>
						<p className="description-label text-muted-foreground">Manage your social buttons.</p>
						<ButtonList />
					</div>
					<hr />
				</div>
			</main>

			<aside className="p-4 md:w-3/12">
				<h1 className="title">Preview</h1>
				<Preview slug={slug} description={description} settings={settings} />
			</aside>
		</div>
	)
}
