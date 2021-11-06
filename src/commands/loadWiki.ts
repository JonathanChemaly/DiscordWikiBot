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

        link = dom.window.document.querySelector("div .top-community > a").href
        console.log(link);
        message.channel.send(link)
    }
}

var searchInput = "";
var searchText = "";
var searchResult = "";
const search: Command = {
    name: 'search',
    description: 'Searches for the information on the selected Wiki',
    hidden: false,
    disabled: false,
    action: async (_, message, args) => {
        if (args == undefined) {
            return;
        }
        console.log(link)
        searchInput = args.join("+");
        searchText = args.join(" ");
        message.channel.send("Searching for " + searchText + " on the wiki..." )

        const dom = await JSDOM.fromURL(link + 'wiki/Special:Search?fulltext=1&query=' + searchInput + '&scope=internal&contentType=&ns%5B0%5D=0#');
        const topLink = dom.window.document.querySelector(".unified-search__result__header > a ").href
        searchResult = topLink;
        console.log(searchResult);
        message.channel.send(searchResult)
    }
}

export {loadWiki, search}
