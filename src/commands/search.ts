import { globalData, searchForWiki, searchForItem, search as searchDOM } from '../common'
import Command from '../model/Command'
const htmlToImage = require('node-html-to-image')
const { MessageAttachment } = require('discord.js')

async function infoBoxFromLink(link: string) {    
    const infoBox = await searchDOM(link, ".va-infobox", (selected: any) => {
	return selected; 
    });	

    const style = globalData.dom.window.document;
    console.log(style);
    
    const infoImage = await htmlToImage({
	html: infoBox.innerHTML,
	quality: 100,
	type: 'jpeg',
	puppeteerArgs: {
	    args: ['--no-sandbox'],
	},
	encoding: 'buffer',
    })
    
    return infoImage;
}

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

        let link = globalData.link;
        let localWikiName: string = globalData.wiki;
        let searchText: string;
        let searchInput: string;
        let inIndex: number;

        if ((inIndex = args.indexOf("--in")) != -1) {
            let localWikiSearch = args.slice(inIndex + 1).join("+");
            [link, localWikiName] = await searchForWiki(localWikiSearch);

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

        message.channel.send(`Searching \"${searchText}\" on ${localWikiName}...`)
        const [topLink, name] = await searchForItem(link, searchInput);

        // grab info box from page at topLink
	const infoImage = await infoBoxFromLink(topLink);
	return message.channel.send(new MessageAttachment(infoImage, "test.jpg"));

    }
}

export default search
