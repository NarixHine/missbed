import Autolinker from 'autolinker'
import ogs from 'open-graph-scraper'

export default async function getOgs(text: string | null) {
    if (text) {
        const urls = Autolinker.parse(text, { urls: true }).map(match => match.getMatchedText())
        const data = await Promise.all(urls.map(url => ogs({ url })))
        return data.map(({ result }) => result).filter(({ ogImage, ogTitle }) => ogImage && ogTitle)
    }
    return []
}
