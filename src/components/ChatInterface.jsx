import { useState, useEffect, useRef } from 'react'
import { getThread, createOpenAI, getAssistant } from '../utils.js'
import '../App.css'

export const ChatInterface = () => {
	const [text, setText] = useState('')
	const [textArray, setTextArray] = useState([])
	const [thread_id, setThreadID] = useState('')
	const openai = createOpenAI()
	const assistant = getAssistant()
	const bottomRef = useRef(null)

	useEffect(() => {
		const func = async () => {
			const thread = await getThread(openai)
			setThreadID(thread)
		}
		func()
	}, [])

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
			<div className="flex items-center justify-center text-xl font-medium">
				<div className="space-y-5">
					<div
						className="h-[70vh] max-h-[70vh] w-[60vw] max-w-[60vw] space-y-10 overflow-y-auto rounded-3xl bg-gray-200 bg-opacity-30 p-5 shadow-2xl backdrop-blur-sm"
						// style={{ backgroundImage: 'url(src/assets/Babylon_Leaf.png)' }}
					>
						<div className="flex items-start justify-start space-x-5">
							<img
								className="inline-block h-12 w-12 rounded-full ring ring-white"
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
						<div className="flex items-start justify-start space-x-5">
							<img
								className="inline-block h-12 w-12 rounded-full ring ring-white"
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
										className="inline-block h-12 w-12 rounded-full ring ring-white"
										src="/src/assets/Babylon-Profile-Image.jpg"
										alt="logo"
									/>
									<p
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
											'bg-babylon-blue-dark w-fit rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-md p-4 text-white drop-shadow-lg'
										}
									>
										{element.message}
									</p>
									<div className="bg-babylon-blue-light inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl text-white ring ring-white">
										AF
									</div>
								</div>
							)
						)}
						<div ref={bottomRef} />
					</div>

					<form
						onSubmit={(event) => {
							event.preventDefault()
							setTextArray((textArray) => [...textArray, { role: 'user', message: text }])
							setText('')
							cycle(text, thread_id, assistant, openai)
						}}
					>
						<div className="flex items-center justify-center space-x-5">
							<input
								className=" flex-auto rounded-xl p-3 text-black drop-shadow-lg placeholder:text-black"
								type="text"
								id="input"
								placeholder="Enter a question"
								value={text}
								onChange={(event) => setText(event.target.value)}
							/>
							<input
								type="submit"
								value="Enter"
								className=" sm:bg-babylon-blue-dark rounded-xl p-3 text-white"
							/>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}
