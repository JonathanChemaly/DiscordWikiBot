import { globalData, searchForWiki } from '../common'

import Command from '../model/Command'

const load: Command = {
    name: 'Load a Wiki',
    args: "",
    description: 'Select the wiki that you want to access',
    hidden: false,
    disabled: false,
    action: async (client, message, args) => {
        if (args == undefined){
            return;
        }

        [globalData.link, globalData.wiki] = await searchForWiki(args.join('+'));

        message.channel.send(`Loading ${globalData.wiki}`);
        message.channel.send("Link: " + globalData.link);
        client.user?.setActivity(globalData.wiki)
    }
}

export default load
