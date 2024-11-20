import { defaultSettings } from "@/src/data/userSettings"
import { getUserSettings, updateUserBanner } from "@/src/lib/actions"
import { Icon } from "@iconify/react"
import { useEffect, useState } from "react"

export default function SupportBannerForm() {
	const [settings, setSettings] = useState(defaultSettings)
	const [selectedOption, setSelectedOption] = useState("NONE")
	const [success, setSuccess] = useState("")
	const [error, setError] = useState("")

	useEffect(() => {
		const loadUserSettings = async () => {
			try {
				const data = await getUserSettings()
				setSettings(data)
				setSelectedOption(data.supportBanner || "NONE")
			} catch (error) {
				console.error("Error loading user settings:", error)
				setError("Could not load user settings.")
			}
		}

		loadUserSettings()
	}, [])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setError("")
		setSuccess("")

		try {
			await updateUserBanner(selectedOption)
			setSuccess("Support banner has been updated!")
		} catch (error) {
			console.error("Error saving support banner:", error)
			setError("Failed to update support banner.")
		}
	}

	return (
		<>
			<form className="my-2 flex max-w-md flex-col gap-2">
				<select
					value={selectedOption}
					onChange={(event) => setSelectedOption(event.target.value)}
					className="form-container text-sm font-medium"
				>
					<option value="NONE" className="bg-card font-medium text-muted-foreground">
						None
					</option>
					<option value="LGBTQ_RIGHTS" className="bg-card font-medium">
						Pride
					</option>
					<option value="ANTI_RACISM" className="bg-card font-medium">
						Anti-Racism
					</option>
					<option value="MENTAL_HEALTH" className="bg-card font-medium">
						Mental Health
					</option>
					<option value="CLIMATE_ACTION" className="bg-card font-medium">
						Climate Action
					</option>
				</select>

				<div>
					<button onClick={handleSubmit} className="btn bg-primary text-primary-foreground">
						<Icon icon="material-symbols:volunteer-activism-outline" className="icon text-xl" />
						Update Banner
					</button>
				</div>
			</form>

			<>
				{success && <p className="mt-2 font-bold text-primary">{success}</p>}
				{error && <p className="mt-2 font-bold text-destructive">{error}</p>}
			</>
		</>
	)
}
