const https = require('https')
import { Http2ServerRequest } from 'http2';
import Command from '../model/Command'
var wiki = "";
const loadWiki: Command = {
    name: 'loadWiki',
    description: 'Select the wiki that you want to access',
    hidden: false,
    disabled: false,
    action: (_, message, args) => {
        if (args == undefined){
            return;
        }
        wiki = args[0];
        message.channel.send(wiki + " wiki was selected!")

        https.get('https://www.fandom.com', (res: any) => {
            console.log('statusCode:', res.statusCode);
            console.log('headwers:', res.headers);

            res.on('data', (d: any) => {
                process.stdout.write(d);
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