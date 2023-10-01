import { api } from 'misskey-js'

export default function fetchNote(instance: string, noteId: string) {
    const cli = new api.APIClient({
        origin: `https://${instance}`
    })
    return cli.request('notes/show', { noteId })
}

export function fetchUserNotes(instance: string, userId: string, untilId?: string) {
    const cli = new api.APIClient({
        origin: `https://${instance}`
    })
    return cli.request('users/notes', {
        userId,
        untilId
    })
}
