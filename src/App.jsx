import './App.css'
import { ChatInterface } from './components/ChatInterface'
import { PopUp } from './components/PopUp.jsx'
import { StarRating } from './components/StarRating.jsx'
import { useState } from 'react'

export default function App() {
	const [buttonPopup, setButtonPopup] = useState(false)
	return (
		<>
			<div
				className="h-dvh bg-babylon-blue-light bg-25% bg-center bg-no-repeat dark:bg-babylon-blue-dark"
				style={{ backgroundImage: 'url(src/assets/Babylon_Leaf_White.png)' }}
			>
				<div className="flex items-center justify-center space-x-3 pb-8">
					<a
						className="inline-block w-2/5 md:w-1/5 lg:w-1/5"
						href="https://babylonmicrofarms.com/"
						target="_blank"
					>
						<picture alt="logo">
							<source
								srcSet="/src/assets/Babylon-Logo-White.png"
								media="(prefers-color-scheme:dark)"
							/>
							<img src="/src/assets/Babylon-Logo.png" />
						</picture>
					</a>
					<h1 className="pb-8 pt-8 font-sans text-3xl font-semibold text-babylon-blue-dark sm:text-xl md:text-3xl lg:text-5xl dark:text-white">
						MICRO - BOT
					</h1>
				</div>

				<ChatInterface />

				<div className="h-18 top-7/8 fixed w-dvw bg-babylon-blue-dark p-5 sm:left-0 sm:top-0 sm:h-dvh sm:w-auto md:left-0 md:top-0 md:h-dvh md:w-auto lg:left-0 lg:top-0 lg:h-dvh lg:w-auto">
					<button onClick={() => setButtonPopup(!buttonPopup)}>
						<img
							className="h-8 w-8 md:h-12 md:w-12 lg:h-12 lg:w-12"
							src="/src/assets/star.png"
							alt="logo"
						/>
					</button>

					<PopUp trigger={buttonPopup}>
						<h3 className="flex justify-center text-babylon-blue-dark">Rate Micro-Bot!</h3>
						<StarRating />
					</PopUp>
				</div>
			</div>
		</>
	)
}
