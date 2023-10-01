import fetchNote from '@/lib/misskey'
import getOgs from '@/lib/og'
import NoteDisplayer from './displayer'

export default async function Note({ instance, id }: {
    instance: string,
    id: string
}) {
    const note = await fetchNote(instance, id)
    return <NoteDisplayer {...note} ogs={await getOgs(note.text)} instance={instance}></NoteDisplayer>
}
