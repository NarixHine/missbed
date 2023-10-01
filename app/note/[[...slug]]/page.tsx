import Note from '@/components/note'
import fetchNote from '@/lib/misskey'
import { notFound } from 'next/navigation'

interface EmbeddableNotePageProps {
    params: { slug: string[] }
}

export async function generateMetadata({ params }: EmbeddableNotePageProps) {
    const [instance, id] = params.slug
    const { user } = await fetchNote(instance, id)
    return {
        title: `Note ${id} by @${user.username}`
    }
}

export default function EmbeddableNote({ params }: EmbeddableNotePageProps) {
    const [instance, id] = params.slug
    if (instance && id) {
        return <Note instance={instance} id={id}></Note>
    }
    else {
        notFound()
    }
}
