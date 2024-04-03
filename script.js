import 'dotenv/config'
import OpenAI from 'openai'
import promptSync from 'prompt-sync'

const input = promptSync()
const openai = new OpenAI({ apiKey: process.env.API_KEY })

const chat_history = []

while (1) {
	const usr_input = input('User: ')
	chat_history.push({ role: 'user', content: usr_input })

	let res = await openai.chat.completions.create({
		messages: chat_history,
		model: 'gpt-3.5-turbo',
	})

	const bot_output = res.choices[0].message.content
	console.log('Bot:', bot_output)

	chat_history.push({ role: 'assistant', content: bot_output })

	if (usr_input.toLowerCase().includes('bye')) {
		break
	}
}
