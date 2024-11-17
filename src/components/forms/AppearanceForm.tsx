import {
	BORDER_RADIUS_OPTIONS,
	defaultSettings,
	PADDING_OPTIONS,
	SLUG_FONT_SIZES,
	SLUG_FONT_WEIGHT_SIZES
} from "@/src/data/userSettings"
import { getUserSettings, resetSettings } from "@/src/lib/actions"
import "@/src/styles/inputs.css"
import { Icon } from "@iconify/react"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const CheckboxInput = ({ id, label, checked, onChange }) => (
	<div className="my-2 flex items-center space-x-2">
		<input id={id} type="checkbox" checked={checked} onChange={onChange} />
		<label htmlFor={id} className="font-semibold">
			{label}
		</label>
	</div>
)

const ColorInput = ({ id, label, value, onChange, disabled = false }) => (
	<div className="my-2 flex items-center space-x-2">
		<input id={id} type="color" value={value} onChange={onChange} disabled={disabled} />
		<label htmlFor={id} className={`font-semibold ${disabled ? "text-muted line-through" : ""}`}>
			{label}
		</label>
	</div>
)

const RadioOptions = ({ options, name, value, onChange, label }) => (
	<div className="my-2">
		<p className="mb-2 font-bold">{label}</p>
		<div className="space-y-1">
			{options.map((option) => (
				<label key={option.value} className="flex items-center space-x-2 text-xs">
					<input type="radio" name={name} value={option.value} checked={value === option.value} onChange={onChange} />
					<span className="font-normal">{option.label}</span>
				</label>
			))}
		</div>
	</div>
)

export default function AppearanceForm() {
	const { data: session } = useSession()
	const [settings, setSettings] = useState(defaultSettings)
	const [success, setSuccess] = useState("")
	const [error, setError] = useState("")

	const handleColorChange = (key) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setSettings((prev) => ({ ...prev, [key]: e.target.value }))
	}

	const handleRadioChange = (key) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setSettings((prev) => ({ ...prev, [key]: e.target.value }))
	}

	const handleCheckboxChange = (key) => (e: React.ChangeEvent<HTMLInputElement>) => {
		setSettings((prev) => ({ ...prev, [key]: e.target.checked }))
	}

	useEffect(() => {
		const loadUserData = async () => {
			if (!session?.user) {
				console.error("No user session found")
				return
			}

			try {
				const settingsData = await getUserSettings()
				setSettings(settingsData)
			} catch (error) {
				console.error("Error loading user settings:", error)
			}
		}

		loadUserData()
	}, [session])

	const handleReset = async (e: React.MouseEvent) => {
		if (e) e.preventDefault()

		try {
			const result = await resetSettings()
			const data = await result.json()
			setSettings(data.settings)
			setSuccess("Settings reset to default.")
		} catch (error) {
			console.error("Error resetting user settings:", error)
			setError("Failed to reset user settings.")
		}
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const res = await fetch("/api/preferences", {
				method: "PUT",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(settings)
			})
			if (!res.ok) throw new Error(`Failed to update settings: ${res.statusText}`)
			setSuccess("Updated successfully!")
			setSettings(settings)
		} catch (error) {
			console.error("Error submitting form:", error)
			setError("Failed to submit form.")
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit} className="flex flex-wrap">
				<div className="flex w-full flex-col md:w-1/2">
					<h1 className="subtitle my-2">General Settings</h1>
					<hr className="max-w-xs" />
					<ColorInput
						id="backgroundColor"
						label="Main Page Background Color"
						value={settings.backgroundColor}
						onChange={handleColorChange("backgroundColor")}
					/>

					<ColorInput
						id="slugTextColor"
						label="Username Font Color"
						value={settings.slugTextColor}
						onChange={handleColorChange("slugTextColor")}
					/>

					<ColorInput
						id="headerTextColor"
						label="Header Font Color"
						value={settings.headerTextColor}
						onChange={handleColorChange("headerTextColor")}
					/>
					<hr className="max-w-xs" />

					<RadioOptions
						name="slugTextSize"
						label="Username Font Size"
						options={SLUG_FONT_SIZES}
						value={settings.slugTextSize}
						onChange={handleRadioChange("slugTextSize")}
					/>

					<RadioOptions
						name="slugTextWeight"
						label="Username Font Weight"
						options={SLUG_FONT_WEIGHT_SIZES}
						value={settings.slugTextWeight}
						onChange={handleRadioChange("slugTextWeight")}
					/>
				</div>

				<div className="flex w-full flex-col md:w-1/2">
					<h1 className="subtitle my-2">Social Buttons</h1>
					<hr className="max-w-xs" />
					<ColorInput
						id="buttonBackgroundColor"
						label="Social Button Background Color"
						value={settings.buttonBackgroundColor}
						onChange={handleColorChange("buttonBackgroundColor")}
					/>

					<ColorInput
						id="buttonIconColor"
						label="Social Button Icon Color"
						value={settings.buttonIconColor}
						onChange={handleColorChange("buttonIconColor")}
					/>

					<ColorInput
						id="buttonHoverBackgroundColor"
						label="Social Button Hover Background Color"
						value={settings.buttonHoverBackgroundColor}
						onChange={handleColorChange("buttonHoverBackgroundColor")}
					/>
					<hr className="max-w-xs" />

					<CheckboxInput
						id="isButtonShadow"
						label="Enable Social Button Shadow"
						checked={settings.isButtonShadow}
						onChange={handleCheckboxChange("isButtonShadow")}
					/>

					<ColorInput
						id="buttonShadowColor"
						label="Social Button Shadow Color"
						value={settings.buttonShadowColor}
						disabled={!settings.isButtonShadow}
						onChange={handleColorChange("buttonShadowColor")}
					/>
					<hr className="max-w-xs" />

					<h1 className="subtitle my-2">Link Buttons</h1>
					<hr className="max-w-xs" />
					<ColorInput
						id="linkBackgroundColor"
						label="Link Button Background Color"
						value={settings.linkBackgroundColor}
						onChange={handleColorChange("linkBackgroundColor")}
					/>

					<ColorInput
						id="linkTextColor"
						label="Link Button Font Color"
						value={settings.linkTextColor}
						onChange={handleColorChange("linkTextColor")}
					/>

					<ColorInput
						id="linkHoverBackgroundColor"
						label="Link Button Hover Background Color"
						value={settings.linkHoverBackgroundColor}
						onChange={handleColorChange("linkHoverBackgroundColor")}
					/>
					<hr className="max-w-xs" />

					<CheckboxInput
						id="isLinkShadow"
						label="Enable Link Button Shadow"
						checked={settings.isLinkShadow}
						onChange={handleCheckboxChange("isLinkShadow")}
					/>

					<ColorInput
						id="linkShadowColor"
						label="Link Button Shadow Color"
						value={settings.linkShadowColor}
						disabled={!settings.isLinkShadow}
						onChange={handleColorChange("linkShadowColor")}
					/>
					<hr className="max-w-xs" />

					<RadioOptions
						name="linkBorderRadius"
						label="Link Button Corner Radius"
						options={BORDER_RADIUS_OPTIONS}
						value={settings.linkBorderRadius}
						onChange={handleRadioChange("linkBorderRadius")}
					/>

					<RadioOptions
						name="linkPadding"
						label="Link Button Padding"
						options={PADDING_OPTIONS}
						value={settings.linkPadding}
						onChange={handleRadioChange("linkPadding")}
					/>
				</div>

				<div className="flex flex-row gap-2">
					<button type="submit" className="btn bg-primary text-primary-foreground">
						<Icon icon="material-symbols:update" className="icon text-xl" />
						Update Settings
					</button>
					<button type="button" onClick={handleReset} className="btn bg-destructive text-destructive-foreground">
						<Icon icon="material-symbols:device-reset" className="icon text-xl" />
						Reset to Default
					</button>
				</div>
			</form>

			{error && <p className="mt-2 font-bold text-destructive">{error}</p>}
			{success && <p className="mt-2 font-bold text-accent">{success}</p>}
		</>
	)
}
