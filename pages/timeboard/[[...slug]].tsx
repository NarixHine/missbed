import Skeleton from '@/components/skeleton'
import Timeline from '@/components/timeline'
import cli from '@/lib/misskey'
import { Note } from 'misskey-js/built/entities'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'

export default function EmbeddableNote({ notes, instance, userId }: {
    notes: Note[],
    instance: string,
    userId: string
}) {
    const { isFallback } = useRouter()
    return (isFallback ? <Skeleton></Skeleton> : <Timeline notes={notes} instance={instance} userId={userId} boardly></Timeline>)
}

export const getStaticPaths: GetStaticPaths = () => ({
    fallback: 'blocking',
    paths: [],
})

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (params) {
        const [instance, userId] = params.slug as string[]
        const notes = await cli(instance).request('users/notes', { userId })
        return { props: { notes, instance, userId } }
    }
    return { notFound: true }
}
