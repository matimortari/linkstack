import { defaultSettings } from "@/src/data/userSettings"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect, useState } from "react"

export default function useUser() {
	const { data: session, status } = useSession()
	const [slug, setSlug] = useState("")
	const [description, setDescription] = useState("")
	const [image, setImage] = useState("")
	const [settings, setSettings] = useState({ ...defaultSettings })

	// Redirect if not authenticated
	useEffect(() => {
		if (status === "unauthenticated" || !session?.user) {
			redirect("/login")
		} else {
			// Populate user data once session is available
			if (session?.user) {
				setSlug(session.user.slug || "")
				setImage(session.user.image || "")
				setDescription(session.user.description || "")
				setSettings(session.user.settings || defaultSettings)
			}
		}
	}, [session, status])

	return { session, slug, setSlug, description, setDescription, image, setImage, settings, setSettings }
}
