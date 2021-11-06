import { globalData, getLinkFromWikiName } from './common'

import Command from '../model/Command'

const loadWiki: Command = {
    name: 'loadWiki',
    args: "",
    description: 'Select the wiki that you want to access',
    hidden: false,
    disabled: false,
    action: async (_, message, args) => {
        if (args == undefined){
            return;
        }

        let wikiName = args.join('+');
        message.channel.send("Searching for " + args.join(' '));
        globalData.link = await getLinkFromWikiName(wikiName);
        message.channel.send("Link: " + globalData.link);
    }
}

export default loadWiki
