import { useState, useEffect, useRef } from 'react'
import { getThread, createOpenAI, getAssistant } from '../utils.js'
import '../App.css'

export const ChatInterface = () => {
	const [text, setText] = useState('')
	const [textArray, setTextArray] = useState([])
	const [thread_id, setThreadID] = useState('')
	const [loading, setLoading] = useState(false)
	const [isListening, setIsListening] = useState(false)
	const openai = createOpenAI()
	const assistant = getAssistant()
	const bottomRef = useRef(null)

	const handleSpeechToText = () => {
		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
		if (!SpeechRecognition) {
			alert('Speech recognition not supported in this browser.')
			return
		}

		const recognition = new SpeechRecognition()
		recognition.continuous = false
		recognition.interimResults = true
		recognition.lang = 'en-US'

		recognition.onresult = (event) => {
			const transcript = event.results[0][0].transcript
			setText(transcript)
		}

		recognition.start()

		recognition.onend = () => {
			setIsListening(false)
		}

		recognition.onerror = (event) => {
			console.error('Speech Recognition Error', event.error)
		}
	}

	useEffect(() => {
		const func = async () => {
			const thread = await getThread(openai)
			setThreadID(thread)
		}
		func()
	}, [])

	useEffect(() => {
		if (isListening) {
			handleSpeechToText()
		}
	}, [isListening])

	const cycle = async (message, thread_id, assistant, openai) => {
		await openai.beta.threads.messages.create(thread_id, {
			role: 'user',
			content: message
		})
		const run = await openai.beta.threads.runs.create(thread_id, {
			assistant_id: assistant
		})

		let timeElapsed = 0
		while (timeElapsed < 1000) {
			const retreiveRun = await openai.beta.threads.runs.retrieve(thread_id, run.id)
			if (retreiveRun.status === 'completed') {
				printMessages(thread_id, openai)
				document.getElementById('input').disabled = false
				document.getElementById('button').disabled = false
				document.getElementById('microphone').disabled = false
				setLoading(false)
				return
			}
			timeElapsed += 1
		}
		console.log('failed to respond in time')
	}

	const printMessages = async (thread_id, openai) => {
		const threadMessages = await openai.beta.threads.messages.list(thread_id)
		let textArr = []

		for (let i = threadMessages.data.length - 1; i >= 0; i--) {
			let annotations = threadMessages.data[i].content[0].text.annotations

			for (let j = 0; j < annotations.length; j++) {
				threadMessages.data[i].content[0].text.value = threadMessages.data[
					i
				].content[0].text.value.replace(annotations[j].text, '')
			}

			textArr.push({
				role: threadMessages.data[i].role,
				message: threadMessages.data[i].content[0].text.value
			})
		}

		setTextArray(textArr)
	}

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
	}, [textArray])

	return (
		<>
			<div className=" flex items-center justify-center text-base font-medium sm:text-lg md:text-xl lg:text-xl">
				<div className="space-y-5">
					<div className="h-[80vh] space-y-10 overflow-y-auto rounded-3xl bg-gray-200 bg-opacity-0 p-5 backdrop-blur-none sm:h-[80vh] md:h-[85vh] lg:h-[85vh] lg:w-[80vw] xl:h-[85vh] 2xl:h-[90vh]">
						<div>
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
									<img src="/src/assets/Babylon-Logo-White.png" />
								</picture>
							</a>
							<h1 className="text-md sm:text-md font-sans font-semibold text-babylon-blue-dark dark:text-babylon-blue-light md:text-lg lg:text-2xl">
								MICRO - BOT
							</h1>
						</div>
						<div className="mr-[67.5px] flex items-start justify-start space-x-5">
							<img
								className="inline-block h-8 w-8 rounded-full ring ring-white md:h-12 md:w-12 lg:h-12 lg:w-12"
								src="/src/assets/Babylon-Profile-Image.jpg"
								alt="logo"
							/>
							<p
								className={
									'w-fit rounded-bl-3xl rounded-br-3xl rounded-tl-md rounded-tr-3xl bg-white p-4 text-black drop-shadow-lg'
								}
							>
								Hi! 👋 How can I help you today?
							</p>
						</div>
						<div className="mr-[67.5px] flex items-start justify-start space-x-5">
							<img
								className="inline-block h-8 w-8 rounded-full ring ring-white md:h-12 md:w-12 lg:h-12 lg:w-12"
								src="/src/assets/Babylon-Profile-Image.jpg"
								alt="logo"
							/>
							<p
								className={
									'w-fit rounded-bl-3xl rounded-br-3xl rounded-tl-md rounded-tr-3xl bg-white p-4 text-black drop-shadow-lg'
								}
							>
								Ask me anything about Babylon Micro-Farms.
							</p>
						</div>

						{textArray.map((element, index) =>
							element.role === 'assistant' ? (
								<div key={index} className="mr-[67.5px] flex items-start justify-start space-x-5">
									<img
										className="inline-block h-8 w-8 rounded-full ring ring-white md:h-12 md:w-12 lg:h-12 lg:w-12"
										src="/src/assets/Babylon-Profile-Image.jpg"
										alt="logo"
									/>
									<p
										style={{ whiteSpace: 'pre-line' }}
										className={
											'w-fit rounded-bl-3xl rounded-br-3xl rounded-tl-md rounded-tr-3xl bg-white p-4 text-black drop-shadow-lg'
										}
									>
										{element.message}
									</p>
								</div>
							) : (
								<div key={index} className="ml-[67.5px] flex items-start justify-end space-x-5">
									<p
										className={
											'w-fit rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-md bg-babylon-blue-dark p-4 text-white drop-shadow-lg dark:bg-babylon-blue-light'
										}
									>
										{element.message}
									</p>
									<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-babylon-blue-dark text-white ring ring-white dark:bg-babylon-blue-light sm:text-base md:h-12 md:w-12 md:text-lg lg:h-12 lg:w-12 lg:text-xl">
										<img
											className="inline-block h-8 w-8 rounded-full ring ring-white md:h-12 md:w-12 lg:h-12 lg:w-12"
											src="/src/assets/user.png"
											alt="logo"
										/>
									</div>
								</div>
							)
						)}
						<div ref={bottomRef} />
						{loading && (
							<div className="message assistant-message">
								<div className="loading-spinner" role="status">
									<svg
										aria-hidden="true"
										className="h-10 w-10 animate-spin fill-gray-600 text-gray-200 dark:fill-gray-300 dark:text-gray-600"
										viewBox="0 0 100 101"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
											fill="currentColor"
										/>
										<path
											d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
											fill="currentFill"
										/>
									</svg>
									<span className="sr-only">Loading...</span>
								</div>
							</div>
						)}
					</div>

					<div className="">
						<form
							autoComplete="off"
							onSubmit={(event) => {
								event.preventDefault()
								setTextArray((textArray) => [...textArray, { role: 'user', message: text }])
								setText('')
								setLoading(true)
								cycle(text, thread_id, assistant, openai)
								document.getElementById('input').disabled = true
								document.getElementById('button').disabled = true
								document.getElementById('microphone').disabled = true
							}}
						>
							<div className="relative flex flex-row items-end justify-center">
								<input
									className=" flex-auto rounded-3xl border-2 border-slate-300 bg-white p-3 text-black drop-shadow-lg placeholder:italic placeholder:text-slate-400 focus:border-babylon-blue-dark focus:outline-none focus:ring-1 focus:ring-babylon-blue-dark dark:focus:border-babylon-blue-light dark:focus:ring-babylon-blue-light"
									type="text"
									id="input"
									placeholder="Message Micro-Bot..."
									value={text}
									onChange={(event) => setText(event.target.value)}
								/>
								<input
									className=" absolute right-0 inline-block h-full rounded-r-3xl bg-babylon-blue-dark text-white dark:bg-babylon-blue-light"
									type="image"
									id="button"
									name="submit"
									src="/src/assets/next.png"
									alt="Submit"
								/>
								<button
									className="absolute right-12 inline-block aspect-square h-full bg-babylon-blue-dark p-3 dark:bg-babylon-blue-light"
									type="button"
									id="microphone"
									onClick={() => setIsListening(!isListening)}
								>
									<img
										className=""
										src={isListening ? '/src/assets/Mic-Active.png' : '/src/assets/Mic.png'}
									></img>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
