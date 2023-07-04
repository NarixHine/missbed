import Timeline from '@/components/timeline'
import cli from '@/lib/misskey'
import getOgs from '@/lib/og'
import { Note } from 'misskey-js/built/entities'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { OgObject } from 'open-graph-scraper/dist/lib/types'

export default function EmbeddableTimeline({ notes, instance, userId, ogs }: {
    notes: Note[],
    instance: string,
    userId: string,
    ogs: OgObject[][]
}) {
    return (<>
        <Head>
            <meta name='description' content={`UID: ${userId}. Username: ${notes[0].user.name}`} />
        </Head>
        <Timeline notes={notes} instance={instance} userId={userId} ogs={ogs}></Timeline>
    </>)
}

export const getStaticPaths: GetStaticPaths = () => ({
    fallback: 'blocking',
    paths: [{ params: { slug: ['misskey.cloud', '9cxdmiu7h5'] } }],
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (params) {
        const [instance, userId] = params.slug as string[]
        const notes = await cli(instance).request('users/notes', { userId })
        const ogs = await Promise.all(notes.map(async note => getOgs(note.text)))
        return { props: { notes, instance, userId, ogs }, revalidate: 10 }
    }
    return { notFound: true }
}
