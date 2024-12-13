import Providers from "@/src/components/context/Providers"
import Footer from "@/src/components/Footer"
import { authOptions } from "@/src/lib/auth"
import "@/src/styles/animations.css"
import "@/src/styles/globals.css"
import type { Metadata } from "next"
import { getServerSession } from "next-auth"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "LinkStack",
	description: "Free website for aggregating and managing your links & social media profiles!"
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const session = await getServerSession(authOptions)

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<Providers session={session}>
					<div className="p-2">{children}</div>
					<Footer />
				</Providers>
			</body>
		</html>
	)
}
