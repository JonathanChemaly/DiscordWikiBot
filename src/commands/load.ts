import Command from '../model/Command'
import wikiReader from '../common'

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

        const [wl, wn] = await wikiReader.searchForWiki(args.join('+'));
        wikiReader.wikiLink = wl
        wikiReader.wikiName = wn

        message.channel.send(`Loading ${wn}`);
        message.channel.send(`Link: ${wl}`);
        client.user?.setActivity(wikiReader.wikiName);
    }
}

export default load
