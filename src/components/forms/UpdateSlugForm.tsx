"use client"

import { useUpdateSlug } from "@/src/hooks/useMutations"
import { generateSlug } from "@/src/lib/utils"
import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

export default function UpdateSlugForm() {
	const [slug, setSlug] = useState("")
	const [currentSlug, setCurrentSlug] = useState("")
	const { data: session } = useSession()
	const { mutate, isPending, error, isSuccess } = useUpdateSlug()

	useEffect(() => {
		if (session) {
			setCurrentSlug(session?.user?.slug)
		}
	}, [session])

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		mutate(slug)
	}

	const handleGenerateSlug = () => {
		const newSlug = generateSlug(slug)
		setSlug(newSlug)
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="form-container my-2 max-w-xl">
				<span className="hidden text-sm font-semibold text-muted-foreground md:block">linkstack-live.vercel.app/</span>
				<input
					type="text"
					value={slug}
					onChange={(e) => setSlug(e.target.value)}
					placeholder={currentSlug}
					className="input flex-1 truncate text-sm text-muted-foreground"
					required
				/>

				<div className="flex flex-row gap-1">
					<button type="submit" className="btn bg-primary text-primary-foreground" disabled={isPending}>
						<Icon icon="material-symbols:update" className="icon text-xl" />
						{isPending ? "Updating..." : "Update"}
					</button>
					<button type="button" className="btn bg-secondary text-secondary-foreground" onClick={handleGenerateSlug}>
						<Icon icon="icon-park-outline:magic-wand" className="icon text-xl" />
						Random
					</button>
				</div>
			</form>

			{isSuccess && <p className="mt-2 font-bold text-primary">Slug updated successfully!</p>}
			{error && <p className="mt-2 font-bold text-destructive">Failed to update slug.</p>}
		</>
	)
}
