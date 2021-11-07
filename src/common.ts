const jsdom = require("jsdom");
const { JSDOM } = jsdom;

interface GlobalData {
    link: string
    wiki: string
    dom: any
}

const globalData: GlobalData = {
    link: "",
    wiki: "",
    dom: {}
};

async function search(url: String, selector: String, callback: Function) {
    globalData.dom = await JSDOM.fromURL(url);
    const selected = globalData.dom.window.document.querySelector(selector);
    return callback(selected);
}

async function searchForWiki(wikiName: String) {
    return search(
        'https://www.fandom.com/?s=' + wikiName,
        "div .top-community > a",
        (link: any) => {
            const name = link.querySelector("div .top-community-name").innerHTML.trim();
            return [link.href, name];
        }
    );
}

async function searchForItem(wikiLink: String, item: String) {
    return search(
        wikiLink + 'wiki/Special:Search?fulltext=1&query=' + item + '&scope=internal&contentType=&ns%5B0%5D=0#',
        ".unified-search__result__header > a ",
        (link: any) => {
            return [link.href, link.innerHTML.trim()];
        }
    );
}


export { globalData, search, searchForWiki, searchForItem }
