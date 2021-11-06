import { Client, Message } from 'discord.js'

interface Command {
    name: string
    args: string
    description: string
    hidden: boolean
    disabled: boolean
    action: (client: Client, message: Message, args?: string[]) => void
}

export default Command
