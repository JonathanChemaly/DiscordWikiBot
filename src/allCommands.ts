import commands from './commands/commands'
import pingPong from './commands/pingPong'
import Command from './model/Command'
import loadWiki from './commands/loadWiki'
import search from './commands/search'

const allCommands: Map<string, Command> = new Map()

allCommands.set('commands', commands)
allCommands.set('ping', pingPong)
allCommands.set('load', loadWiki)
allCommands.set('search', search)

export default allCommands
