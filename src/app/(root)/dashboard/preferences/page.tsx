"use client"

import AppearanceForm from "@/src/components/forms/AppearanceForm"
import SupportBannerForm from "@/src/components/forms/SupportBannerForm"
import Navbar from "@/src/components/Navbar"
import useAuthRedirect from "@/src/hooks/useAuthRedirect"

export default function Preferences() {
	useAuthRedirect()

	return (
		<div className="flex min-h-screen md:flex-row">
			<aside className="p-4 md:w-2/12">
				<Navbar />
			</aside>

			<main className="content-container md:w-7/12">
				<header className="mb-2 flex flex-col">
					<h1 className="title">Dashboard</h1>
					<span className="title-label">Update your account preferences.</span>
				</header>
				<hr />

				<div className="flex flex-col">
					<div className="my-4 flex flex-col">
						<h2 className="subtitle">Appearance Settings</h2>
						<AppearanceForm />
					</div>
					<hr />

					<div className="my-4 flex flex-col">
						<h2 className="subtitle">Support Banner</h2>
						<SupportBannerForm />
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
