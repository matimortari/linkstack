"use client"

import AppearanceForm from "@/src/components/forms/AppearanceForm"
import SupportBannerForm from "@/src/components/forms/SupportBannerForm"
import Navbar from "@/src/components/Navbar"
import Preview from "@/src/components/Preview"
import useAuthRedirect from "@/src/hooks/useAuthRedirect"
import { deleteUserAccount } from "@/src/lib/actions"
import { Icon } from "@iconify/react"

export default function Preferences() {
	useAuthRedirect()

	const handleDeleteAccount = async () => {
		const confirmation = confirm("Are you sure you want to delete your account? This action cannot be undone.")

		if (confirmation) {
			try {
				await deleteUserAccount()
				window.location.href = "/login"
			} catch (error) {
				console.error("Error deleting account:", error)
				if (error instanceof Error) {
					alert(error.message)
				} else {
					alert("An unknown error occurred")
				}
			}
		}
	}

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
						<h2 className="subtitle">Appearance</h2>
						<p className="subtitle-label text-muted-foreground">Customize your profile appearance.</p>
						<AppearanceForm />
					</div>
					<hr />

					<div className="my-4 flex flex-col">
						<h2 className="subtitle">Support Banner</h2>
						<p className="subtitle-label text-muted-foreground">Show your support for important causes.</p>
						<SupportBannerForm />
					</div>
					<hr />

					<div className="my-4 flex flex-col">
						<h2 className="subtitle">Delete Account</h2>
						<p className="subtitle-label text-destructive">This action is irreversible. All data will be lost.</p>
						<div>
							<button onClick={handleDeleteAccount} className="btn mt-2 bg-destructive text-destructive-foreground">
								<Icon icon="material-symbols:person-remove-outline" className="icon text-xl" />
								Delete Account
							</button>
						</div>
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
