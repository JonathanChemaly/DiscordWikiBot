import wikiReader from '../common'
import Command from '../model/Command'

const search: Command = {
    name: 'Search for an Item',
    args: "[--in wiki]",
    description: 'Searches for the information on the selected Wiki',
    hidden: false,
    disabled: false,
    action: async (_, message, args) => {
        if (args == undefined) {
            message.channel.send("Arguments are Undefined");
            return;
        }

        // let localWikiSearch: string = "";
        let inIndex: number;
        let itemPluses: string = "";
        let itemSpaces: string = "";
        let wikiOverrideSearch: any;
        let wikiOverride: any;
        let wikiName: any = wikiReader.wikiName;

        if ((inIndex = args.indexOf("--in")) != -1) {
            wikiOverrideSearch = args.slice(inIndex + 1).join("+");
            [wikiOverride, wikiName] = await wikiReader.searchForWiki(wikiOverrideSearch);

            itemPluses = args.slice(0, inIndex).join("+");
            itemSpaces = args.slice(0, inIndex).join(" ");
        } else {
            itemPluses = args.join("+");
            itemSpaces = args.join(" ");
        }

        message.channel.send(`Searching \"${itemSpaces}\" on ${wikiName}...`)
        const [topLink, itemName] = await wikiReader.searchForItem(itemPluses, wikiOverride);

        message.channel.send(topLink)
    }
}

export default search
