"use client"

import { useParams } from "next/navigation"

export default function User() {
	const { slug } = useParams()

	return (
		<div className="m-8 flex h-screen flex-col items-center">
			<p>Hello {slug ? slug : "User"}! </p>

			<button>
				<a href="/login">Join {slug ? slug : "User"} in LinkStack Today!</a>
			</button>
		</div>
	)
}
