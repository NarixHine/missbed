import Autolinker from 'autolinker'
import ogs from 'open-graph-scraper'

export default async function getOgs(text: string | null) {
    if (text) {
        const urls = Array.from(new Set(Autolinker.parse(text, { urls: { schemeMatches: true, tldMatches: false, ipV4Matches: false } }).map(match => match.getMatchedText()))).filter(str => str.startsWith('http'))
        const data = await Promise.all(urls.map(url => ogs({ url })))
        return data.map(({ result }) => result).filter(({ ogImage, ogTitle }) => ogImage && ogTitle)
    }
    return []
}
