const jsdom = require("jsdom");
const { JSDOM } = jsdom;

class WikiReader {
    wikiLink: string;
    wikiName: string;
    dom: any;
    selection: any;

    constructor() {
        this.wikiLink = "";
        this.wikiName = "";
        this.dom = undefined;
        this.selection = undefined;
    }

    async loadDom(url: string) {
        this.dom = await JSDOM.fromURL(url);
    }

    select(selector: string) {
        this.selection = this.dom.window.document.querySelector(selector);
    }

    async searchForWiki(wikiSearch: string) {
        const link = "https://www.fandom.com/?s=" + wikiSearch;
        await this.loadDom(link);
        this.select("div .top-community > a");
        const wikiLink = this.selection.href;

        this.select("div .top-community-name");
        const wikiName = this.selection.innerHTML.trim();

        return [wikiLink, wikiName];
    }

    async searchForItem(itemName: string, wikiOverride?: string) {
        let wikiLink = this.wikiLink;

        if (wikiOverride != undefined) {
            wikiLink = wikiOverride;
        }

        if (wikiLink == undefined) {
            return ["", ""]
        }

        const link = `${wikiLink}wiki/Special:Search?fulltext=1&query=${itemName}&scope=internal&contentType=&ns%5B0%5D=0#`;
        await this.loadDom(link);
        this.select(".unified-search__result__header > a");

        return [this.selection.href, this.selection.innerHTML.trim()];
    }
}

const wikiReader = new WikiReader();

export default wikiReader;
