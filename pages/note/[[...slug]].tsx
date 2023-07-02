import Note from '@/components/note'
import Skeleton from '@/components/skeleton'
import cli from '@/lib/misskey'
import { Note as NoteType } from 'misskey-js/built/entities'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

export default function EmbeddableNote(note : NoteType) {
    const { isFallback } = useRouter()
    return (isFallback ? <Skeleton></Skeleton> : <Note {...note}></Note>)
}

export const getStaticPaths: GetStaticPaths = () => ({
    fallback: true,
    paths: []
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (params) {
        const [instance, noteId] = params.slug as string[]
        const note = await cli(instance).request('notes/show', { noteId })
        console.log(note)
        return { props: note }
    }
    return { notFound: true }
}
