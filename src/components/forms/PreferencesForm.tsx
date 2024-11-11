import "@/src/styles/inputs.css"

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

export default function PreferencesForm() {
	return (
		<form>
			<ColorInput id="color1" label="Color" value="#ff0000" onChange={undefined} />

			<RadioOptions
				options={[
					{ value: "light", label: "Light" },
					{ value: "dark", label: "Dark" }
				]}
				name="theme"
				value="light"
				label="Theme"
				onChange={undefined}
			/>

			<CheckboxInput id="tba" label="Checkbox" checked={true} onChange={undefined} />
		</form>
	)
}
