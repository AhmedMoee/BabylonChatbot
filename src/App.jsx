import './App.css'
import { ChatInterface } from './components/ChatInterface'
import { PopUp } from './components/PopUp.jsx'
import { StarRating } from './components/StarRating.jsx'
import { useState, useEffect, useRef } from 'react'

export default function App() {
	const [buttonPopup, setButtonPopup] = useState(false);

	let popUpRef = useRef();

	useEffect(() => {
		let handler = (e) => {
			if (!popUpRef.current.contains(e.target)) {
				setButtonPopup(false);
			}
		};
		document.addEventListener("mousedown", handler);
		return() => {
			document.removeEventListener("mousedown", handler);
		}
	});

	return (
		<>
			<div
				className="h-dvh bg-babylon-blue-light bg-25% bg-center bg-no-repeat dark:bg-babylon-blue-dark"
				style={{ backgroundImage: 'url(src/assets/Babylon_Leaf_White.png)' }}
			>
				<div className="flex items-center justify-center space-x-3">
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

				<div ref={popUpRef}>
					<button onClick={() => setButtonPopup(!buttonPopup)}>
						<img
							className="fixed left-5 top-5 inline-block h-8 w-8 md:h-12 md:w-12 lg:h-12 lg:w-12"
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
