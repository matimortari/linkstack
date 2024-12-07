"use client"

import UpdateHeaderForm from "@/src/components/forms/UpdateHeaderForm"
import UpdateSlugForm from "@/src/components/forms/UpdateSlugForm"
import ButtonList from "@/src/components/lists/ButtonList"
import LinkList from "@/src/components/lists/LinkList"
import Navbar from "@/src/components/Navbar"
import Preview from "@/src/components/Preview"
import useAuthRedirect from "@/src/hooks/useAuthRedirect"

export default function Dashboard() {
	const { session } = useAuthRedirect()

	return (
		<div className="flex min-h-screen md:flex-row">
			<aside className="p-4 md:w-2/12">
				<Navbar />
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

						<UpdateSlugForm />
					</div>
					<hr />

					<div className="my-4 flex flex-col">
						<h2 className="subtitle">Update Header</h2>
						<p className="description-label text-muted-foreground">Update the description for your profile header.</p>
						<UpdateHeaderForm />
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
				<Preview />
			</aside>
		</div>
	)
}
