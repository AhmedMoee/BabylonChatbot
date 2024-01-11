import '../App.css'

export const PopUp = (props) => {
	return props.trigger ? (
		<div className="fixed inset-0 bg-transparent">
			<div className="absolute inset-0" onClick={props.onClose} />
			<div
				className="fixed left-7/20 top-1/4 h-2/5 w-2/6 overflow-y-auto rounded-3xl border-2 border-gray-200 bg-babylon-green p-5 shadow-lg dark:to-babylon-blue-light md:p-10 lg:p-16"
				// style={{ width: '80%', height: '40%', maxWidth: '30rem', left: '35%', top: '25%' }}
			>
				{props.children}
			</div>
		</div>
	) : null
}
