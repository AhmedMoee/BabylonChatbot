import './App.css'
import { ChatInterface } from './components/ChatInterface'

export default function App() {
	return (
		<>
			<div
				className="bg-babylon-blue-light dark:bg-babylon-blue-dark bg-25% min-h-screen bg-center bg-no-repeat"
				style={{ backgroundImage: 'url(src/assets/Babylon_Leaf_White.png)' }}
			>
				<div className="flex items-center justify-center space-x-3">
					<picture className="inline-block w-1/5" alt="logo">
						<source
							srcSet="/src/assets/Babylon-Logo-White.png"
							media="(prefers-color-scheme:dark)"
						/>
						<img src="/src/assets/Babylon-Logo.png" />
					</picture>
					<h1 className="text-babylon-blue-dark sm:xl pb-8 pt-8 font-sans font-semibold md:text-3xl lg:text-5xl dark:text-white">
						MICRO - BOT
					</h1>
				</div>

				<ChatInterface />
			</div>
		</>
	)
}
