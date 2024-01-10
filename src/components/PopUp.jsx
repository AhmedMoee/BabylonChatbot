import '../App.css'

export const PopUp = (props) => {
	return props.trigger ? (
		<div className="fixed top-10 flex-auto rounded-xl p-3 text-black drop-shadow-lg placeholder:text-black">
			<div className="min-w-120 max-w-120 relative -right-1/4 top-3/4 w-full items-center rounded-3xl bg-white p-16">
				{props.children}
			</div>
		</div>
	) : (
		''
	)
}
