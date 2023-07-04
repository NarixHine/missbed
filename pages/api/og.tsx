import getOgs from '@/lib/og'
import type { NextApiRequest, NextApiResponse } from 'next'
import { OgObject } from 'open-graph-scraper/dist/lib/types'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ ogs: OgObject[][] }>
) {
    const texts = req.body.texts as string[]
    const ogs = await Promise.all(texts.map(text => getOgs(text)))
    res.status(200).json({ ogs })
}
