import '../App.css'

export const PopUp = (props) => {
	return props.trigger ? (
		<div className="fixed inset-0 bg-transparent">
			<div className="absolute inset-0" onClick={props.onClose} />
			<div
				className="fixed overflow-y-auto rounded-3xl border-2 border-gray-200 bg-babylon-green p-5 shadow-lg md:p-10 lg:p-16 dark:to-babylon-blue-light"
				style={{ width: '80%', height: '40%', maxWidth: '30rem', left: '35%', top: '25%' }}
			>
				{props.children}
			</div>
		</div>
	) : null
}
