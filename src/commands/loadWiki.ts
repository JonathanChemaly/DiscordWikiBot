const https = require('https')
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

import Command from '../model/Command'

var wiki = "";
var text = "";

const loadWiki: Command = {
    name: 'loadWiki',
    description: 'Select the wiki that you want to access',
    hidden: false,
    disabled: false,
    action: (_, message, args) => {
        if (args == undefined){
            return;
        }
        text = args.join(' ');
        wiki = args.join('+');
        message.channel.send(text + " wiki was selected!")

        https.get('https://www.fandom.com/?s=' + wiki, (res: any) => {
            console.log('statusCode:', res.statusCode);
            console.log('headwers:', res.headers);

            res.on('data', (d: any) => {
                process.stdout.write(d);

                const dom = new JSDOM(d);
                console.log(dom.window.document.querySelector(".top-community").textContent);
            });

        }).on('error', (e: any) => {
            console.error(e);
        });
    }
}

var input = "";
const search: Command = {
    name: 'search',
    description: 'Searches for the information on the selected Wiki',
    hidden: false,
    disabled: false,
    action: (_, message, args) => {
        if (args == undefined){
            return;
        }
        input= args[0];
        message.channel.send("Searching for " + input + " in the " + wiki + " wiki...")
    }
}

export {loadWiki, search} 