import { useState, useEffect, useRef } from 'react'
import { getThread, createOpenAI, getAssistant } from '../utils.js'
import '../App.css'

export const ChatInterface = () => {
	const [text, setText] = useState('')
	const [textArray, setTextArray] = useState([])
	const [thread_id, setThreadID] = useState('')
	const [disabled, setDisabled] = useState(false)
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
				setDisabled(false)
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
			<div className="flex items-center justify-center text-base font-medium sm:text-lg md:text-xl lg:text-xl">
				<div className="space-y-5">
					<div className="max-h-[58vh] min-h-[58vh] min-w-[90vw] max-w-[90vw] space-y-10 overflow-y-auto rounded-3xl bg-gray-200 bg-opacity-30 p-5 shadow-2xl backdrop-blur-sm sm:max-h-[70vh] sm:min-h-[70vh] sm:min-w-[60vw] sm:max-w-[60vw] md:max-h-[70vh] md:min-h-[70vh] md:min-w-[60vw] md:max-w-[60vw] lg:max-h-[70vh] lg:min-h-[70vh] lg:min-w-[60vw] lg:max-w-[60vw]">
						<div className="flex items-start justify-start space-x-5">
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
						<div className="flex items-start justify-start space-x-5">
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
											'bg-babylon-blue-dark dark:bg-babylon-blue-light w-fit rounded-bl-3xl rounded-br-3xl rounded-tl-3xl rounded-tr-md p-4 text-white drop-shadow-lg'
										}
									>
										{element.message}
									</p>
									<div className="bg-babylon-blue-light dark:bg-babylon-blue-dark inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white ring ring-white sm:text-base md:h-12 md:w-12 md:text-lg lg:h-12 lg:w-12 lg:text-xl">
										AF
									</div>
								</div>
							)
						)}
						<div ref={bottomRef} />
					</div>

					<div>
						<form
							onSubmit={(event) => {
								event.preventDefault()
								setTextArray((textArray) => [...textArray, { role: 'user', message: text }])
								setText('')
								cycle(text, thread_id, assistant, openai)
								setDisabled(true)
							}}
						>
							{disabled ? (
								<div className="flex items-center justify-center space-x-5">
									<input
										disabled
										className=" flex-auto rounded-xl p-3 text-black drop-shadow-lg placeholder:text-black"
										type="text"
										id="input"
										placeholder="Enter a question"
										value={text}
										onChange={(event) => setText(event.target.value)}
									/>
									<input
										disabled
										type="submit"
										value="Enter"
										className=" bg-babylon-blue-dark dark:bg-babylon-blue-light hidden rounded-xl p-3 text-white md:block lg:block"
									/>
								</div>
							) : (
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
										className=" dark:bg-babylon-blue-light bg-babylon-blue-dark hidden rounded-xl p-3 text-white md:block lg:block"
									/>
								</div>
							)}
						</form>
					</div>
				</div>
			</div>
		</>
	)
}
