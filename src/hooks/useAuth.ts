import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"

export default function useAuthRedirect() {
	const { data: session, status } = useSession()

	if (status === "unauthenticated" || !session?.user) {
		redirect("/login")
	}
}
