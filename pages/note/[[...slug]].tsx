import Note, { NoteProps } from '@/components/note'
import Skeleton from '@/components/skeleton'
import cli from '@/lib/misskey'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function EmbeddableNote(note: NoteProps) {
    const { isFallback } = useRouter()
    return isFallback ? <Skeleton></Skeleton> : (<>
        <Head>
            <meta name='description' content={`Note: ${note.text ?? note.id}.`} />
        </Head>
        <Note {...note}></Note>
    </>)
}

export const getStaticPaths: GetStaticPaths = () => ({
    fallback: true,
    paths: [{ params: { slug: ['misskey.cloud', '9gowykckhw'] } }]
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (params) {
        const [instance, noteId] = params.slug as string[]
        const note = await cli(instance).request('notes/show', { noteId })
        return { props: { ...note, instance }, revalidate: 10 }
    }
    return { notFound: true }
}
