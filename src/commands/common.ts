const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const globalData = {
    link: "",
};

async function getLinkFromURLWithSelector(url: String, selector: String) {
    const dom = await JSDOM.fromURL(url);
    return dom.window.document.querySelector(selector).href
}

async function getLinkFromWikiName(wikiName: String) {
    return getLinkFromURLWithSelector('https://www.fandom.com/?s=' + wikiName, "div .top-community > a");
}

async function getTopLinkFromWikiSearch(wikiLink: String, search: String) {
    return getLinkFromURLWithSelector(
        wikiLink + 'wiki/Special:Search?fulltext=1&query=' + search + '&scope=internal&contentType=&ns%5B0%5D=0#',
        ".unified-search__result__header > a "
    );
}


export { globalData, getLinkFromWikiName, getTopLinkFromWikiSearch, getLinkFromURLWithSelector }
