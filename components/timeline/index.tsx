import { fetchUserNotes } from '@/lib/misskey'
import getOgs from '@/lib/og'
import TimelineDisplayer from './displayer'

export default async function Timeline({ instance, id,boardly }: {
    instance: string,
    id: string,
    boardly?:boolean
}) {
    const notes = await fetchUserNotes(instance, id)
    const ogs = await Promise.all(notes.map(async note => getOgs(note.text)))
    return <TimelineDisplayer id={id} notes={notes} instance={instance} ogs={ogs} boardly={boardly}></TimelineDisplayer>
}
