import './App.css'
import { ChatInterface } from './components/ChatInterface'

export default function App() {
	return (
		<>
			<div
				className="bg-babylon-blue-light bg-25% min-h-screen bg-center bg-repeat-x"
				style={{ backgroundImage: 'url(src/assets/Babylon_Leaf_White.png)' }}
			>
				<div className="flex items-center justify-center space-x-3">
					<img className="inline-block w-1/5" src="/src/assets/Babylon-Logo.png" alt="logo" />
					<h1 className="text-babylon-blue-dark pb-8 pt-8 font-sans text-5xl font-semibold">
						MICRO - BOT
					</h1>
				</div>

				<ChatInterface />
			</div>
		</>
	)
}
