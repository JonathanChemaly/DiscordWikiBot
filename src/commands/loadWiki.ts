const https = require('https')
const jsdom = require("jsdom");
const fs = require('fs');
const { JSDOM } = jsdom;

import Command from '../model/Command'

var wiki = "";
var text = "";
var link = "";

const loadWiki: Command = {
    name: 'loadWiki',
    description: 'Select the wiki that you want to access',
    hidden: false,
    disabled: false,
    action: async (_, message, args) => {
        if (args == undefined){
            return;
        }

        text = args.join(' ');
        wiki = args.join('+');
        message.channel.send(text + " wiki was selected!")

        const dom = await JSDOM.fromURL('https://www.fandom.com/?s=' + wiki);

        const topCommunityLink = dom.window.document.querySelector("div .top-community > a").href
        link = topCommunityLink;
        console.log(link);
    }
}

var input = "";
const search: Command = {
    name: 'search',
    description: 'Searches for the information on the selected Wiki',
    hidden: false,
    disabled: false,
    action: (_, message, args) => {
        if (args == undefined) {
            return;
        }
        input= args[0];
        message.channel.send("Searching for " + input + " in the " + wiki + " wiki...")
    }
}

export {loadWiki, search}
