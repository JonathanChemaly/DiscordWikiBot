import commands from './commands/commands'
import pingPong from './commands/pingPong'
import Command from './model/Command'
import load from './commands/load'
import search from './commands/search'

const allCommands: Map<string, Command> = new Map()

allCommands.set('commands', commands)
allCommands.set('ping', pingPong)
allCommands.set('load', load)
allCommands.set('search', search)

export default allCommands
