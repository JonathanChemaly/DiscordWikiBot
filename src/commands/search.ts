import { globalData, getLinkFromWikiName, getTopLinkFromWikiSearch } from './common'
import Command from '../model/Command'

const search: Command = {
    name: 'search',
    args: "[--in wiki]",
    description: 'Searches for the information on the selected Wiki',
    hidden: false,
    disabled: false,
    action: async (_, message, args) => {
        if (args == undefined) {
            message.channel.send("Arguments are Undefined");
            return;
        }

        var link = globalData.link;
        var searchInput
        var searchText
        var inIndex;

        if ((inIndex = args.indexOf("--in")) != -1) {
            let localWikiName = args.slice(inIndex + 1).join("+");
            link = await getLinkFromWikiName(localWikiName);

            searchInput = args.slice(0, inIndex).join("+");
            searchText = args.slice(0, inIndex).join(" ");
        } else {
            searchInput = args.join("+");
            searchText = args.join(" ");
        }

        if (link == undefined) {
            message.channel.send("No Wiki is Loaded");
            return;
        }

        message.channel.send("Searching \"" + searchText + "\" on the wiki..." )
        const topLink = await getTopLinkFromWikiSearch(link, searchInput);
        message.channel.send(topLink)
    }
}

export default search
