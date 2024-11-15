"use client"

import UpdateHeaderForm from "@/src/components/forms/UpdateHeaderForm"
import UpdateSlugForm from "@/src/components/forms/UpdateSlugForm"
import ButtonList from "@/src/components/lists/ButtonList"
import LinkList from "@/src/components/lists/LinkList"
import Navbar from "@/src/components/Navbar"
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
					<span className="title-label">
						Welcome back, <span className="font-bold text-primary">{session.user.name}</span>!
					</span>
				</header>
				<hr />

				<div className="flex flex-col">
					<div className="my-4 flex flex-col">
						<h2 className="subtitle">Update Slug</h2>
						<UpdateSlugForm />
					</div>
					<hr />

					<div className="my-4 flex flex-col">
						<h2 className="subtitle">Update Header Description</h2>
						<UpdateHeaderForm />
					</div>
					<hr />

					<div className="my-4 flex flex-col">
						<h2 className="subtitle">My Links</h2>
						<LinkList />
					</div>
					<hr />

					<div className="my-4 flex flex-col">
						<h2 className="subtitle">My Social Buttons</h2>
						<ButtonList />
					</div>
					<hr />
				</div>
			</main>

			<aside className="p-4 md:w-3/12">
				<h1 className="title">Preview</h1>
			</aside>
		</div>
	)
}
